# 前端合约交互 API

> **学习时间**: Week 3-4, Day 8-10
> **技术栈**: wagmi v3 + viem
> **学习目标**: 掌握使用 wagmi Hooks 进行智能合约交互

---

## 一、核心概念

### 1.1 读 vs 写

在智能合约交互中，操作分为两类：

| 操作类型 | 说明 | 需要 Gas? | 需要签名? | 工具 |
|----------|------|-----------|-----------|------|
| **读（Read）** | 查询链上数据 | ❌ 否 | ❌ 否 | `useReadContract` |
| **写（Write）** | 修改链上状态 | ✅ 是 | ✅ 是 | `useWriteContract` |

### 1.2 什么是 ABI？

**ABI (Application Binary Interface)** 是智能合约的接口定义：

```typescript
// ABI 告诉前端：
// 1. 合约有哪些函数
// 2. 每个函数的参数类型
// 3. 返回值类型
const contractABI = [
  {
    "name": "balanceOf",
    "type": "function",
    "stateMutability": "view",
    "inputs": [{ "name": "account", "type": "address" }],
    "outputs": [{ "name": "", "type": "uint256" }]
  },
  {
    "name": "transfer",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      { "name": "to", "type": "address" },
      { "name": "amount", "type": "uint256" }
    ],
    "outputs": [{ "name": "", "type": "bool" }]
  }
] as const;  // ⚠️ 注意 'as const'，这样才有类型提示
```

**如何获取 ABI？**
- Remix 编译后可以复制
- Hardhat 编译后在 `artifacts/` 目录
- Etherscan 上已验证的合约可以查看

---

## 二、读取合约（useReadContract）

### 2.1 基础用法

```typescript
import { useReadContract } from 'wagmi'

function TokenBalance() {
  const { data, isLoading, isError, error } = useReadContract({
    address: '0x...',        // 合约地址
    abi: contractABI,        // ABI
    functionName: 'balanceOf', // 函数名
    args: [userAddress]      // 参数数组
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>

  return <div>Balance: {data?.toString()}</div>
}
```

### 2.2 实际示例：查询 ERC20 余额

```typescript
import { useReadContract, useAccount } from 'wagmi'
import { formatUnits } from 'viem'

const ERC20_ABI = [
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ type: 'uint256' }]
  },
  {
    name: 'decimals',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint8' }]
  }
] as const

function TokenBalance() {
  const { address } = useAccount()

  // 查询余额
  const { data: balance } = useReadContract({
    address: '0x...', // USDT 地址
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: [address!]
  })

  // 查询 decimals
  const { data: decimals } = useReadContract({
    address: '0x...',
    abi: ERC20_ABI,
    functionName: 'decimals'
  })

  // 格式化显示
  const formattedBalance = balance && decimals
    ? formatUnits(balance, decimals)
    : '0'

  return <div>Balance: {formattedBalance} USDT</div>
}
```

### 2.3 条件查询

```typescript
function ConditionalRead() {
  const { address, isConnected } = useAccount()

  const { data } = useReadContract({
    address: '0x...',
    abi: contractABI,
    functionName: 'balanceOf',
    args: [address!],
    query: {
      enabled: isConnected && !!address  // 只有连接钱包后才查询
    }
  })

  return <div>{data?.toString()}</div>
}
```

### 2.4 轮询更新

```typescript
function LiveBalance() {
  const { address } = useAccount()

  const { data: balance } = useReadContract({
    address: '0x...',
    abi: contractABI,
    functionName: 'balanceOf',
    args: [address!],
    query: {
      refetchInterval: 5000  // 每 5 秒刷新一次
    }
  })

  return <div>Balance: {balance?.toString()}</div>
}
```

---

## 三、写入合约（useWriteContract）

### 3.1 基础用法

```typescript
import { useWriteContract } from 'wagmi'

function TransferButton() {
  const {
    writeContract,      // 执行写入的函数
    data: hash,         // 交易 hash
    isPending,          // 是否正在处理
    isSuccess,          // 是否成功
    isError,           // 是否失败
    error              // 错误信息
  } = useWriteContract()

  const handleTransfer = async () => {
    writeContract({
      address: '0x...',
      abi: contractABI,
      functionName: 'transfer',
      args: ['0xRecipient...', 1000000n]  // 注意：使用 BigInt
    })
  }

  return (
    <div>
      <button
        onClick={handleTransfer}
        disabled={isPending}
      >
        {isPending ? 'Transferring...' : 'Transfer'}
      </button>

      {isSuccess && <div>Success! Hash: {hash}</div>}
      {isError && <div>Error: {error?.message}</div>}
    </div>
  )
}
```

### 3.2 实际示例：ERC20 转账

```typescript
import { useWriteContract, useAccount } from 'wagmi'
import { parseUnits } from 'viem'
import { useState } from 'react'

const ERC20_ABI = [
  {
    name: 'transfer',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ],
    outputs: [{ type: 'bool' }]
  }
] as const

function TransferForm() {
  const { address } = useAccount()
  const [toAddress, setToAddress] = useState('')
  const [amount, setAmount] = useState('')

  const { writeContract, isPending, isSuccess, error } = useWriteContract()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // 将用户输入的数量转换为 wei（假设 18 decimals）
      const amountInWei = parseUnits(amount, 18)

      writeContract({
        address: '0x...', // Token 地址
        abi: ERC20_ABI,
        functionName: 'transfer',
        args: [toAddress as `0x${string}`, amountInWei]
      })
    } catch (err) {
      console.error('Transfer failed:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Recipient address"
        value={toAddress}
        onChange={(e) => setToAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Transferring...' : 'Transfer'}
      </button>

      {isSuccess && <p>✅ Transfer successful!</p>}
      {error && <p>❌ Error: {error.message}</p>}
    </form>
  )
}
```

### 3.3 发送 ETH（payable 函数）

```typescript
function DepositButton() {
  const { writeContract, isPending } = useWriteContract()

  const handleDeposit = () => {
    writeContract({
      address: '0x...',
      abi: contractABI,
      functionName: 'deposit',
      value: parseEther('0.1')  // 发送 0.1 ETH
    })
  }

  return (
    <button onClick={handleDeposit} disabled={isPending}>
      Deposit 0.1 ETH
    </button>
  )
}
```

---

## 四、等待交易确认（useWaitForTransactionReceipt）

### 4.1 基础用法

```typescript
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'

function TransferWithConfirmation() {
  const { writeContract, data: hash, isPending } = useWriteContract()

  // 等待交易确认
  const {
    isLoading: isConfirming,   // 正在确认
    isSuccess: isConfirmed,    // 已确认
    error: confirmError
  } = useWaitForTransactionReceipt({
    hash
  })

  const handleTransfer = () => {
    writeContract({
      address: '0x...',
      abi: contractABI,
      functionName: 'transfer',
      args: ['0xRecipient...', 1000000n]
    })
  }

  return (
    <div>
      <button onClick={handleTransfer} disabled={isPending || isConfirming}>
        {isPending && 'Waiting for signature...'}
        {isConfirming && 'Confirming transaction...'}
        {!isPending && !isConfirming && 'Transfer'}
      </button>

      {hash && <div>Transaction: {hash}</div>}
      {isConfirmed && <div>✅ Transaction confirmed!</div>}
      {confirmError && <div>❌ Confirmation error</div>}
    </div>
  )
}
```

### 4.2 完整示例：带状态提示的转账

```typescript
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import { toast } from 'sonner'  // 或其他 toast 库

function CompleteTransferFlow() {
  const [toAddress, setToAddress] = useState('')
  const [amount, setAmount] = useState('')

  const {
    writeContract,
    data: hash,
    isPending,
    error: writeError
  } = useWriteContract()

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed
  } = useWaitForTransactionReceipt({ hash })

  // 监听状态变化，显示提示
  useEffect(() => {
    if (isPending) {
      toast.info('Please confirm in your wallet...')
    }
  }, [isPending])

  useEffect(() => {
    if (isConfirming) {
      toast.loading('Transaction pending...')
    }
  }, [isConfirming])

  useEffect(() => {
    if (isConfirmed) {
      toast.success('Transaction confirmed!')
      // 清空表单
      setToAddress('')
      setAmount('')
    }
  }, [isConfirmed])

  useEffect(() => {
    if (writeError) {
      toast.error(`Error: ${writeError.message}`)
    }
  }, [writeError])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    writeContract({
      address: '0x...',
      abi: contractABI,
      functionName: 'transfer',
      args: [toAddress as `0x${string}`, parseEther(amount)]
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={toAddress}
        onChange={(e) => setToAddress(e.target.value)}
        placeholder="Recipient address"
        disabled={isPending || isConfirming}
      />
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        disabled={isPending || isConfirming}
      />
      <button
        type="submit"
        disabled={isPending || isConfirming}
      >
        {isPending && '⏳ Waiting for signature...'}
        {isConfirming && '⏳ Confirming...'}
        {!isPending && !isConfirming && 'Transfer'}
      </button>

      {hash && (
        <a
          href={`https://sepolia.etherscan.io/tx/${hash}`}
          target="_blank"
        >
          View on Etherscan
        </a>
      )}
    </form>
  )
}
```

---

## 五、监听合约事件（useWatchContractEvent）

### 5.1 基础用法

```typescript
import { useWatchContractEvent } from 'wagmi'

function EventListener() {
  useWatchContractEvent({
    address: '0x...',
    abi: contractABI,
    eventName: 'Transfer',
    onLogs(logs) {
      console.log('New transfer events:', logs)
      // 更新 UI
    }
  })

  return <div>Listening to Transfer events...</div>
}
```

### 5.2 实际示例：Todo 事件监听

```typescript
import { useWatchContractEvent } from 'wagmi'
import { useState } from 'react'

const TODO_ABI = [
  {
    name: 'TodoAdded',
    type: 'event',
    inputs: [
      { indexed: true, name: 'user', type: 'address' },
      { indexed: false, name: 'index', type: 'uint256' },
      { indexed: false, name: 'content', type: 'string' }
    ]
  }
] as const

function TodoList() {
  const [todos, setTodos] = useState<string[]>([])

  // 监听 TodoAdded 事件
  useWatchContractEvent({
    address: '0x...',
    abi: TODO_ABI,
    eventName: 'TodoAdded',
    onLogs(logs) {
      // 当有新 Todo 添加时，自动更新列表
      logs.forEach(log => {
        const { user, content } = log.args
        console.log(`${user} added: ${content}`)
        setTodos(prev => [...prev, content])
      })
    }
  })

  return (
    <ul>
      {todos.map((todo, i) => (
        <li key={i}>{todo}</li>
      ))}
    </ul>
  )
}
```

### 5.3 过滤特定用户的事件

```typescript
import { useAccount } from 'wagmi'

function MyTodoEvents() {
  const { address } = useAccount()

  useWatchContractEvent({
    address: '0x...',
    abi: contractABI,
    eventName: 'TodoAdded',
    args: {
      user: address  // 只监听当前用户的事件（需要 indexed）
    },
    onLogs(logs) {
      console.log('My new todos:', logs)
    }
  })

  return <div>Listening to my events only...</div>
}
```

---

## 六、单位转换工具（viem）

### 6.1 ETH 转换

```typescript
import { parseEther, formatEther } from 'viem'

// 字符串 → wei（BigInt）
const weiAmount = parseEther('1.5')
// 1500000000000000000n

// wei → 字符串
const ethAmount = formatEther(1500000000000000000n)
// '1.5'
```

### 6.2 ERC20 转换

```typescript
import { parseUnits, formatUnits } from 'viem'

// USDT (6 decimals)
const usdtWei = parseUnits('100', 6)
// 100000000n

const usdtReadable = formatUnits(100000000n, 6)
// '100'

// DAI (18 decimals)
const daiWei = parseUnits('100', 18)
// 100000000000000000000n

const daiReadable = formatUnits(100000000000000000000n, 18)
// '100'
```

### 6.3 实用工具函数

```typescript
// 格式化显示余额
export function formatBalance(
  balance: bigint,
  decimals: number,
  maxDecimals: number = 4
): string {
  const formatted = formatUnits(balance, decimals)
  const num = parseFloat(formatted)
  return num.toFixed(maxDecimals)
}

// 使用示例
const balance = 1234567890123456789n
formatBalance(balance, 18, 2)  // '1.23'
```

---

## 七、地址验证（viem）

```typescript
import { isAddress, getAddress } from 'viem'

// 验证地址格式
const valid = isAddress('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb')
// true

const invalid = isAddress('invalid')
// false

// 转换为 checksum 格式
const checksummed = getAddress('0x742d35cc6634c0532925a3b844bc9e7595f0beb')
// '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
```

---

## 八、完整 API 速查表

### 8.1 wagmi Hooks

| Hook | 用途 | 需要 Gas? | 返回值 |
|------|------|-----------|--------|
| `useReadContract` | 读取合约数据 | ❌ | `{ data, isLoading, error }` |
| `useWriteContract` | 写入合约 | ✅ | `{ writeContract, isPending, hash }` |
| `useWaitForTransactionReceipt` | 等待交易确认 | - | `{ isLoading, isSuccess }` |
| `useWatchContractEvent` | 监听事件 | ❌ | 无返回值（回调） |
| `useSimulateContract` | 模拟交易 | ❌ | `{ data, error }` |

### 8.2 viem 工具函数

| 函数 | 用途 | 示例 |
|------|------|------|
| `parseEther` | 字符串 → wei | `parseEther('1.5')` |
| `formatEther` | wei → 字符串 | `formatEther(1500000000000000000n)` |
| `parseUnits` | 字符串 → 代币单位 | `parseUnits('100', 6)` |
| `formatUnits` | 代币单位 → 字符串 | `formatUnits(100000000n, 6)` |
| `isAddress` | 验证地址 | `isAddress('0x...')` |
| `getAddress` | Checksum 地址 | `getAddress('0x...')` |

---

## 九、常见错误处理

```typescript
function TransferWithErrorHandling() {
  const { writeContract, error } = useWriteContract()

  const handleTransfer = async () => {
    try {
      writeContract({
        address: '0x...',
        abi: contractABI,
        functionName: 'transfer',
        args: [toAddress, amount]
      })
    } catch (err) {
      console.error('Transfer error:', err)
    }
  }

  // 解析错误类型
  useEffect(() => {
    if (error) {
      if (error.message.includes('User rejected')) {
        toast.error('You rejected the transaction')
      } else if (error.message.includes('insufficient funds')) {
        toast.error('Insufficient balance')
      } else if (error.message.includes('gas')) {
        toast.error('Not enough gas')
      } else {
        toast.error('Transaction failed')
      }
    }
  }, [error])

  return <button onClick={handleTransfer}>Transfer</button>
}
```

---

## 十、最佳实践

1. **总是使用 TypeScript 和 `as const`**
```typescript
const ABI = [...] as const  // ✅ 有类型提示
const ABI = [...]           // ❌ 没有类型提示
```

2. **条件查询，避免无效请求**
```typescript
const { data } = useReadContract({
  // ...
  query: {
    enabled: !!address  // ✅ 只有有地址时才查询
  }
})
```

3. **处理所有状态**
```typescript
if (isPending) return <Loading />
if (isConfirming) return <Confirming />
if (isSuccess) return <Success />
if (error) return <Error message={error.message} />
```

4. **使用 BigInt**
```typescript
const amount = 1000000n     // ✅ 正确
const amount = 1000000      // ❌ 可能溢出
```

---

## 十一、下一步

学完前端合约交互 API 后，继续学习：
- 📄 [03-交易流程处理.md](./03-交易流程处理.md) - 交易流程处理

---

**更新时间**: 2024-12-05
**作者**: AI 助手
