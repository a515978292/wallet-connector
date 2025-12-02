"use client";

import Link from "next/link";
import PageHeader from "../components/PageHeader";

// ==================== 导入 wagmi hooks ====================
// 这些是 wagmi 提供的 React Hooks，用于与钱包交互
import {
  useAccount,
  useConnect,
  useDisconnect,
  useBalance,
  useChainId,
} from "wagmi";

// 导入 viem 工具函数用于格式化余额
import { formatUnits } from "viem";

export default function WalletPage() {
  // ==================== 使用 wagmi hooks ====================

  // 1. useAccount - 获取账户信息
  // address: 钱包地址
  // isConnected: 是否已连接
  // isConnecting: 是否正在连接
  const { address, isConnected, isConnecting } = useAccount();

  // 2. useConnect - 连接钱包
  // connectors: 可用的连接器列表（我们配置的 injected）
  // connect: 连接函数
  const { connectors, connect, isPending } = useConnect();

  // 3. useDisconnect - 断开连接
  const { disconnect } = useDisconnect();

  // 4. useBalance - 获取余额
  // 只在连接时查询余额
  const { data: balance } = useBalance({
    address: address,
  });

  // 5. useChainId - 获取当前链 ID
  const chainId = useChainId();

  // ==================== 渲染 UI ====================
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <PageHeader title="钱包连接器" />

      <main className="w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            👛 钱包连接器
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            学习如何连接 MetaMask 和其他 Web3 钱包
          </p>
        </div>

        {/* 连接状态卡片 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            连接状态
          </h2>

          <div className="space-y-4">
            {!isConnected ? (
              // 未连接状态
              <div className="text-center py-8">
                <div className="text-gray-400 mb-6 text-5xl">🔌</div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {isConnecting ? "正在连接..." : "尚未连接钱包"}
                </p>
                {/* 遍历所有可用的连接器 */}
                {connectors.map((connector) => (
                  <button
                    key={connector.id}
                    onClick={() => connect({ connector })}
                    disabled={isPending}
                    className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPending ? "连接中..." : `连接 ${connector.name}`}
                  </button>
                ))}
              </div>
            ) : (
              // 已连接状态
              <div className="text-center py-8">
                <div className="text-green-500 mb-6 text-5xl">✅</div>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  已连接钱包
                </p>

                {/* 显示钱包地址 */}
                <p className="text-gray-900 dark:text-white font-mono text-sm bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded inline-block mb-4">
                  {address}
                </p>

                {/* 显示余额 */}
                {balance && (
                  <div className="mb-4">
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      余额
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {parseFloat(
                        formatUnits(balance.value, balance.decimals)
                      ).toFixed(4)}{" "}
                      {balance.symbol}
                    </p>
                  </div>
                )}

                {/* 显示链 ID */}
                <div className="mb-6">
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    网络
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    Chain ID: {chainId}
                    {chainId === 11155111 && " (Sepolia 测试网)"}
                  </p>
                </div>

                {/* 断开连接按钮 */}
                <div>
                  <button
                    onClick={() => disconnect()}
                    className="px-8 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
                  >
                    断开连接
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 学习要点卡片 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            📚 核心知识点
          </h2>
          <ul className="space-y-3 text-gray-600 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-indigo-600 dark:text-indigo-400 mr-2">
                ✅
              </span>
              <span>
                <strong>useAccount</strong> - 获取钱包地址和连接状态
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 dark:text-indigo-400 mr-2">
                ✅
              </span>
              <span>
                <strong>useConnect</strong> - 连接钱包，支持多种连接器
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 dark:text-indigo-400 mr-2">
                ✅
              </span>
              <span>
                <strong>useDisconnect</strong> - 断开钱包连接
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 dark:text-indigo-400 mr-2">
                ✅
              </span>
              <span>
                <strong>useBalance</strong> - 查询账户 ETH 余额
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 dark:text-indigo-400 mr-2">
                ✅
              </span>
              <span>
                <strong>useChainId</strong> - 获取当前区块链网络 ID
              </span>
            </li>
          </ul>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/contract"
            className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
          >
            下一步：智能合约交互 →
          </Link>
        </div>
      </main>
    </div>
  );
}
