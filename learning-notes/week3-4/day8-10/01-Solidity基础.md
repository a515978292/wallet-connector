# Solidity 基础（前端视角）

> **学习时间**: Week 3-4, Day 8-10
> **学习目标**: 作为前端开发者，能看懂 Solidity 代码，知道如何调用合约函数

---

## 重要说明 ⚠️

作为前端开发者，你**不需要成为 Solidity 专家**，只需要：

- ✅ 能看懂合约代码
- ✅ 知道如何调用函数
- ✅ 理解事件机制
- ✅ 理解基本数据类型

❌ **不需要深入学习**：

- 汇编（Assembly）
- 高级安全审计
- Gas 优化细节
- 复杂的继承和抽象合约

---

## 一、30 分钟 Solidity 核心语法

### 1.1 基础合约结构

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    // 状态变量（存储在区块链上，需要 Gas）
    uint256 public value;
    string public name;

    // 映射（类似 JavaScript 的 Object）
    mapping(address => uint256) public balances;

    // 事件（前端可以监听）
    event ValueChanged(uint256 newValue, address indexed changer);

    // 构造函数（部署时执行一次）
    constructor() {
        value = 0;
    }

    // 读取函数（view = 只读，不需要 Gas）
    function getValue() public view returns (uint256) {
        return value;
    }

    // 写入函数（会改变状态，需要 Gas）
    function setValue(uint256 _value) public {
        value = _value;
        emit ValueChanged(_value, msg.sender);
    }

    // pure: 纯计算， 不读不写 （只用参数计算）
      function add(uint256 a, uint256 b) public pure returns (uint256) {
        return a + b;  // 只用参数计算
    }

    //external：只能外部调用
    function externalFunc() external pure returns (string memory) {
        return "I'm external";
    }

    // payable 函数（可以接收 ETH）
    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }
}
```

---

## 二、必须掌握的关键字

### 2.1 函数修饰符

| 关键字     | 含义              | 前端影响                | 示例                                |
| ---------- | ----------------- | ----------------------- | ----------------------------------- |
| `public`   | 可内部 & 外部调用 | ✅ 可以从前端调用       | `function getTodos() public`        |
| `view`     | 只读函数          | ✅ 不需要 Gas，立即返回 | `function balanceOf() public view`  |
| `pure`     | 纯函数            | ✅ 不读状态，不需要 Gas | `function add(a, b) public pure`    |
| `payable`  | 可接收 ETH        | ✅ 调用时可发送 ETH     | `function deposit() public payable` |
| `private`  | 仅合约内部        | ❌ 前端无法调用         | `function _internal() private`      |
| `external` | 只能外部调用      | ✅ 前端可以调用         | `function execute() external`       |

### 2.2 实际应用

```solidity
// ✅ 前端可以免费调用（不需要 Gas）
function getBalance(address user) public view returns (uint256) {
    return balances[user];
}

// ✅ 前端调用需要支付 Gas 并签名
function transfer(address to, uint256 amount) public {
    balances[msg.sender] -= amount;
    balances[to] += amount;
}

// ✅ 前端调用时可以发送 ETH
function buyTokens() public payable {
    uint256 tokens = msg.value / price;
    balances[msg.sender] += tokens;
}
```

---

## 三、核心数据类型

### 3.1 基础类型

```solidity
// 1. 数字类型
uint256 public age = 25;           // 无符号整数（最常用）
int256 public temperature = -10;   // 有符号整数
uint8 public percentage = 100;     // 小整数（0-255）

// 2. 地址类型
address public owner;              // 钱包地址
address public contractAddr;       // 合约地址

// 3. 布尔类型
bool public isActive = true;

// 4. 字符串
string public name = "MyToken";

// 5. 字节类型
bytes32 public hash;               // 固定大小
bytes public data;                 // 动态大小
```

### 3.2 复杂类型

#### 数组（Array）

```solidity
// 固定大小数组
uint256[5] public fixedArray;

// 动态数组
uint256[] public dynamicArray;
string[] public names;

// 数组操作
function addItem(string memory _name) public {
    names.push(_name);              // 添加元素
}

function getLength() public view returns (uint256) {
    return names.length;            // 获取长度
}

function getItem(uint256 index) public view returns (string memory) {
    return names[index];            // 获取元素
}
```

#### 映射（Mapping）

```solidity
// 类似 JavaScript: { address: balance }
mapping(address => uint256) public balances;

// 嵌套映射: { owner: { spender: amount } }
mapping(address => mapping(address => uint256)) public allowances;

// 使用示例
function setBalance(address user, uint256 amount) public {
    balances[user] = amount;
}

function getBalance(address user) public view returns (uint256) {
    return balances[user];
}
```

#### 结构体（Struct）

```solidity
// 定义结构体（类似 TypeScript 的 interface）
struct Todo {
    string content;
    bool completed;
    uint256 timestamp;
}

// 使用结构体
Todo[] public todos;

// 创建结构体实例
function addTodo(string memory _content) public {
    todos.push(Todo({
        content: _content,
        completed: false,
        timestamp: block.timestamp
    }));
}

// 获取结构体
function getTodo(uint256 index) public view returns (Todo memory) {
    return todos[index];
}
```

---

## 四、事件机制（Event）

### 4.1 什么是事件？

事件是智能合约与前端通信的方式，前端可以监听事件来实时更新 UI。

```solidity
// 定义事件
event TodoAdded(address indexed user, uint256 index, string content);
event TodoCompleted(address indexed user, uint256 index);
event Transfer(address indexed from, address indexed to, uint256 value);

// 触发事件
function addTodo(string memory _content) public {
    todos.push(Todo(_content, false));
    emit TodoAdded(msg.sender, todos.length - 1, _content);
}
```

### 4.2 indexed 关键字

- `indexed` 参数可以被过滤和搜索
- 最多 3 个参数可以设为 `indexed`
- 前端可以根据 `indexed` 参数筛选事件

```solidity
// 前端可以筛选特定用户的事件
event TodoAdded(address indexed user, uint256 index, string content);

// 前端可以筛选特定 from 和 to 的转账
event Transfer(address indexed from, address indexed to, uint256 value);
```

### 4.3 前端如何监听事件？

```typescript
// 在前端使用 wagmi 监听事件
import { useWatchContractEvent } from "wagmi";

useWatchContractEvent({
  address: "0x...",
  abi: contractABI,
  eventName: "TodoAdded",
  onLogs(logs) {
    console.log("New todo added:", logs);
    // 更新 UI
  },
});
```

---

## 五、特殊变量

### 5.1 msg（消息相关）

```solidity
msg.sender    // 当前调用者的地址（最常用！）
msg.value     // 发送的 ETH 数量（wei 为单位）
msg.data      // 完整的调用数据
```

**实际应用**：

```solidity
function withdraw() public {
    // 只允许所有者提款
    require(msg.sender == owner, "Not owner");

    //合约里的eth
    uint256 amount = balances[msg.sender];
    balances[msg.sender] = 0;
    // payable(msg.sender)  => 把普通账户转化成可以收取eth的账户 , transfer(amount) 转账
    payable(msg.sender).transfer(amount);
}

function deposit() public payable {
    // msg.value 是用户发送的 ETH 数量
    balances[msg.sender] += msg.value;
}
```

### 5.2 block（区块相关）

```solidity
block.timestamp     // 当前区块时间戳（秒）
block.number        // 当前区块号
block.chainid       // 链 ID（1=主网, 11155111=Sepolia）
```

**实际应用**：

```solidity
uint256 public deadline;

function setDeadline(uint256 duration) public {
    deadline = block.timestamp + duration;
}

function isExpired() public view returns (bool) {
    return block.timestamp > deadline;
}
```

### 5.3 tx（交易相关）

```solidity
tx.origin         // 交易发起者（谨慎使用！）
tx.gasprice       // 交易的 Gas 价格
```

---

## 六、常用函数模式

### 6.1 require（条件检查）

```solidity
function transfer(address to, uint256 amount) public {
    // 检查条件，失败则回滚交易
    require(balances[msg.sender] >= amount, "Insufficient balance");
    require(to != address(0), "Invalid address");

    balances[msg.sender] -= amount;
    balances[to] += amount;
}
```

### 6.2 modifier（修饰符）

```solidity
address public owner;

// 定义修饰符
modifier onlyOwner() {
    require(msg.sender == owner, "Not owner");
    _;  // 继续执行函数
}

// 使用修饰符
function setPrice(uint256 _price) public onlyOwner {
    price = _price;
}
```

### 6.3 constructor（构造函数）

```solidity
contract MyToken {
    address public owner;
    uint256 public totalSupply;

    // 部署合约时执行一次
    constructor(uint256 _initialSupply) {
        owner = msg.sender;
        totalSupply = _initialSupply;
        balances[msg.sender] = _initialSupply;
    }
}
```

---

## 七、前端开发者速查表

### 7.1 如何判断函数是否需要 Gas？

| 函数类型  | 需要 Gas? | 需要签名? | 立即返回?           |
| --------- | --------- | --------- | ------------------- |
| `view`    | ❌ 不需要 | ❌ 不需要 | ✅ 是               |
| `pure`    | ❌ 不需要 | ❌ 不需要 | ✅ 是               |
| 普通函数  | ✅ 需要   | ✅ 需要   | ❌ 否（需等待确认） |
| `payable` | ✅ 需要   | ✅ 需要   | ❌ 否（需等待确认） |

### 7.2 前端调用示例

```typescript
import { useReadContract, useWriteContract } from "wagmi";

// ❌ 不需要 Gas - 使用 useReadContract
const { data: balance } = useReadContract({
  address: "0x...",
  abi: contractABI,
  functionName: "balanceOf",
  args: [userAddress],
});

// ✅ 需要 Gas - 使用 useWriteContract
const { writeContract } = useWriteContract();

await writeContract({
  address: "0x...",
  abi: contractABI,
  functionName: "transfer",
  args: [toAddress, amount],
});
```

---

## 八、学习资源

### 推荐学习路径

1. **CryptoZombies** (3-4 小时)

   - https://cryptozombies.io/zh/course
   - 完成 Lesson 1-2 即可

2. **Solidity by Example** (参考文档)

   - https://solidity-by-example.org
   - 需要时查阅

3. **官方文档**（可选）
   - https://docs.soliditylang.org

### 学习建议

- ✅ 快速过一遍语法，不要深入
- ✅ 重点理解前端会用到的部分
- ✅ 边做项目边查文档
- ❌ 不要在 Solidity 上花太多时间
- ❌ 不要追求成为 Solidity 专家

---

## 九、练习检查点

完成本节学习后，你应该能够：

- [ ] 看懂基础 Solidity 合约代码
- [ ] 识别哪些函数需要 Gas
- [ ] 理解 `view`、`pure`、`payable` 的区别
- [ ] 知道如何定义和触发事件
- [ ] 理解 `mapping`、`struct`、`array` 的使用
- [ ] 知道 `msg.sender` 和 `msg.value` 的作用
- [ ] 能够阅读 ERC20、ERC721 等标准合约

---

## 十、下一步

学完 Solidity 基础后，继续学习：

- 📄 [02-合约交互 API.md](./02-合约交互API.md) - 前端合约交互 API
- 📄 [03-交易流程处理.md](./03-交易流程处理.md) - 交易流程处理

---

**更新时间**: 2024-12-05
**作者**: AI 助手
