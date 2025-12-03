# Wagmi v3 连接钱包指南

> 快速上手 wagmi v3，实现钱包连接功能

---

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install wagmi viem @tanstack/react-query
```

### 2. 配置 Providers

```typescript
// app/providers.tsx
"use client";
import { WagmiProvider, createConfig, http } from "wagmi";
import { sepolia, mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const config = createConfig({
  chains: [sepolia, mainnet],
  transports: {
    [sepolia.id]: http(),
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
```

### 3. 在 Layout 中使用

```typescript
// app/layout.tsx
import { Providers } from "./providers";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

---

## 💡 核心 Hooks

```typescript
// 1. 获取连接信息（地址、链 ID、状态等）
const { address, chainId, chain, isConnected, status } = useConnection();

// 2. 获取可用的钱包连接器
const connectors = useConnectors();

// 3. 执行连接
const { connect, isPending } = useConnect();

// 4. 断开连接
const { disconnect } = useDisconnect();

// 5. 查询余额
const { data: balance } = useBalance({ address });
// balance: { value: bigint, decimals: number, symbol: string }
```

---

## 📝 完整示例

```typescript
"use client";
import {
  useConnection,
  useConnectors,
  useConnect,
  useDisconnect,
  useBalance,
} from "wagmi";
import { formatUnits } from "viem";

export default function WalletPage() {
  // 1. 获取连接信息
  const { address, chainId, chain, isConnected, status } = useConnection();

  // 2. 获取连接器列表
  const connectors = useConnectors();

  // 3. 连接和断开
  const { connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  // 4. 获取余额
  const { data: balance } = useBalance({ address });

  return (
    <div>
      {!isConnected ? (
        // 未连接：显示连接按钮
        <div>
          {connectors.map((connector) => (
            <button
              key={connector.id}
              onClick={() => connect({ connector })}
              disabled={isPending}
            >
              连接 {connector.name}
            </button>
          ))}
        </div>
      ) : (
        // 已连接：显示信息
        <div>
          <p>地址：{address}</p>
          <p>链 ID：{chainId}</p>
          <p>链名称：{chain?.name}</p>
          <p>状态：{status}</p>

          {balance && (
            <p>
              余额：
              {parseFloat(formatUnits(balance.value, balance.decimals)).toFixed(
                4
              )} {balance.symbol}
            </p>
          )}

          <button onClick={() => disconnect()}>断开连接</button>
        </div>
      )}
    </div>
  );
}
```

---

## 🔧 常用场景

```typescript
// 显示连接状态
const { status } = useConnection();
const text = {
  connected: "已连接",
  connecting: "连接中...",
  disconnected: "未连接",
}[status];

// 获取链信息
const { chain, chainId } = useConnection();
console.log(chain?.name, chainId); // "Sepolia" 11155111

// SSR 兼容（避免 hydration 错误）
const mounted = useMounted();
if (!mounted) return null;
```

---

## ⚠️ 常见错误

```typescript
// ❌ 错误：connectors 从 useConnect 中获取（已弃用）
const { connectors, connect } = useConnect();

// ✅ 正确：使用独立的 useConnectors
const connectors = useConnectors();
const { connect } = useConnect();

// ❌ 错误：未处理 SSR，会导致 hydration 错误
const { address } = useConnection();
return <div>{address}</div>;

// ✅ 正确：先检查是否挂载
const mounted = useMounted();
if (!mounted) return null;
```

---

## 📚 学习资源

- [Wagmi v3 官方文档](https://wagmi.sh)
- [useConnection API](https://wagmi.sh/react/api/hooks/useConnection)
- [useConnectors API](https://wagmi.sh/react/api/hooks/useConnectors)
- [Migration Guide](https://wagmi.sh/react/guides/migrate-from-v1-to-v2)

---

## 🎓 快速记忆

```typescript
useConnection()  → 看状态（地址、链 ID、连接状态）
useConnectors()  → 看列表（可用钱包）
useConnect()     → 执行连接
useDisconnect()  → 执行断开
useBalance()     → 看余额
```

---

**下一步学习：** 智能合约交互、交易发送
