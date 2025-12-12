/**
 * ============================================
 * 📦 Web3 Providers 配置文件
 * ============================================
 *
 * 这个文件的作用：给整个应用提供 Web3 能力
 * 就像给房子接通水电一样，让所有房间都能用上
 *
 * 包含两个核心功能：
 * 1. 提供 Web3 连接能力（WagmiProvider）
 * 2. 提供数据管理能力（QueryClientProvider）
 */

"use client";

// 从 wagmi 导入：核心的 Web3 React Hooks 库
import { WagmiProvider, createConfig, http, injected } from "wagmi";

// 导入区块链网络配置：mainnet（主网）和 sepolia（测试网）
import { mainnet, sepolia } from "wagmi/chains";

// 从 React Query 导入：用于管理异步数据（缓存、自动刷新等）
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/**
 * 创建 wagmi 配置
 *
 * 这就像配置你的"网络设置"：
 * - chains: 支持哪些区块链网络
 * - connectors: 支持哪些钱包连接方式
 * - transports: 每个链的 RPC 连接配置
 */

const infuraKey = process.env.NEXT_PUBLIC_INFURA_KEY || "";
const config = createConfig({
  chains: [mainnet, sepolia], // mainnet 是第一个，自动成为默认链
  transports: {
    [mainnet.id]: http(`https://mainnet.infura.io/v3/${infuraKey}`),
    [sepolia.id]: http(`https://sepolia.infura.io/v3/${infuraKey}`),
  },
  ssr: true,
});

/**
 * 创建 QueryClient 实例
 *
 * 作用：管理所有的数据请求和缓存
 * - 自动缓存：避免重复请求相同数据
 * - 自动刷新：数据过期时自动更新
 * - 优化性能：减少对区块链节点的调用
 *
 * 类比：就像浏览器的缓存，记住你访问过的网页
 */
const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      {/* 第二层：QueryClientProvider - 提供数据缓存能力 */}
      {/* 传入 queryClient，用于管理所有数据请求 */}
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

/**
 * ============================================
 * 📖 使用说明
 * ============================================
 *
 * 1. 在 layout.tsx 中导入并使用：
 *    import { Providers } from './providers'
 *
 *    <body>
 *      <Providers>
 *        {children}
 *      </Providers>
 *    </body>
 *
 * 2. 然后在任何页面/组件中都能使用 Web3 功能：
 *    import { useAccount, useBalance } from 'wagmi'
 *    const { address } = useAccount()
 *
 * ============================================
 * 🔧 常见问题
 * ============================================
 *
 * Q: 为什么需要 "use client"？
 * A: 因为 Web3 需要浏览器环境（window.ethereum），
 *    不能在服务器端运行
 *
 * Q: 可以添加更多链吗？
 * A: 可以！从 'wagmi/chains' 导入其他链，
 *    比如 polygon, arbitrum, optimism 等
 *    并在 transports 中配置对应的 http()
 */
