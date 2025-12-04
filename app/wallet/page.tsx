"use client";

import Link from "next/link";
import PageHeader from "../../components/PageHeader";

// ==================== 导入 wagmi v3 hooks 用于与钱包交互 ====================
import {
  useConnection, // ✨ v3 新 API
  useConnectors, // ✨ v3 新 API：获取连接器列表
  useConnect, // 连接钱包
  useDisconnect, // 断开钱包
  useBalance, // 查询余额
} from "wagmi";

// 导入 viem 工具函数用于格式化余额
import { formatUnits } from "viem";
import useMounted from "../hooks/useMounted";
import { useEffect } from "react";

export default function WalletPage() {
  /**
   * 1. ✨ useConnection是 wagmi v3 的核心 hook，获取连接信息 包含地址、链 ID、链信息、连接器、连接状态等
   * address: 当前钱包地址
   * chainId: 当前链 ID
   * chain: 完整的链信息对象
   * connector: 当前使用的连接器
   * isConnected: 是否已连接
   * isConnecting: 是否正在连接中
   * isReconnecting: 是否正在重新连接
   * status: 连接状态（'connected' | 'connecting' | 'disconnected' | 'reconnecting'）
   */
  const {
    address,
    chainId,
    chain,
    isConnected,
    isConnecting,
    status,
    connector,
  } = useConnection();
  console.log("chain:", chain);

  // 2. ✨ useConnectors - 获取可用的连接器列表（v3 新 API）
  const connectors = useConnectors();

  // 3. useConnect - 连接钱包
  const { connect, isPending } = useConnect();

  // 4. useDisconnect - 断开连接
  const { disconnect } = useDisconnect();

  // 5. useBalance - 获取余额
  const { data: balance } = useBalance({
    address: address,
  });

  const mounted = useMounted();

  useEffect(() => {
    if (balance) {
      const balanceValue = formatUnits(balance.value, balance.decimals);
    }
  }, [balance]);

  if (!mounted) {
    return null;
  }

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
                      ).toFixed(4)}
                      {balance.symbol}
                    </p>
                  </div>
                )}

                {/* 显示链信息（v3 增强） */}
                <div className="mb-6">
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    网络信息
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-2">
                    <p className="text-sm">
                      <span className="text-gray-500 dark:text-gray-400">
                        Chain ID:{" "}
                      </span>
                      <span className="font-mono text-gray-900 dark:text-white">
                        {chainId}
                      </span>
                    </p>
                    {chain && (
                      <>
                        <p className="text-sm">
                          <span className="text-gray-500 dark:text-gray-400">
                            Chain Name:{" "}
                          </span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {chain.name}
                          </span>
                        </p>
                        <p className="text-sm">
                          <span className="text-gray-500 dark:text-gray-400">
                            Currency:{" "}
                          </span>
                          <span className="text-gray-900 dark:text-white">
                            {chain.nativeCurrency.symbol}
                          </span>
                        </p>
                      </>
                    )}
                    <p className="text-sm">
                      <span className="text-gray-500 dark:text-gray-400">
                        Status:{" "}
                      </span>
                      <span className="font-semibold text-green-600 dark:text-green-400">
                        {status} ✓
                      </span>
                    </p>
                  </div>
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
            📚 核心知识点（Wagmi v3 最新 API）
          </h2>
          <ul className="space-y-3 text-gray-600 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-indigo-600 dark:text-indigo-400 mr-2">
                ✨
              </span>
              <span>
                <strong>useConnection</strong> - v3 新 API！一站式获取地址、链
                ID、连接状态等所有信息
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 dark:text-indigo-400 mr-2">
                ✨
              </span>
              <span>
                <strong>useConnectors</strong> - v3 新
                API！获取可用的连接器列表（替代 useConnect 中的 connectors）
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 dark:text-indigo-400 mr-2">
                ✅
              </span>
              <span>
                <strong>useConnect</strong> - 执行连接操作
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
                💡
              </span>
              <span className="text-sm">
                <em>
                  v3 API 改进：useChainId → useConnection，useConnect.connectors
                  → useConnectors
                </em>
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
