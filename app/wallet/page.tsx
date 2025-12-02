"use client";

import Link from "next/link";
import { useState } from "react";
import PageHeader from "../components/PageHeader";

export default function WalletPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");

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

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            连接状态
          </h2>

          <div className="space-y-4">
            {!isConnected ? (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-6 text-5xl">🔌</div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  尚未连接钱包
                </p>
                <button
                  onClick={() => {
                    // TODO: 实现钱包连接逻辑
                    setIsConnected(true);
                    setAddress("0x1234...5678");
                  }}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  连接钱包
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-green-500 mb-6 text-5xl">✅</div>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  已连接钱包
                </p>
                <p className="text-gray-900 dark:text-white font-mono text-sm bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded inline-block mb-6">
                  {address}
                </p>
                <div>
                  <button
                    onClick={() => {
                      setIsConnected(false);
                      setAddress("");
                    }}
                    className="px-8 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
                  >
                    断开连接
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            📚 学习要点
          </h2>
          <ul className="space-y-3 text-gray-600 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-indigo-600 dark:text-indigo-400 mr-2">
                •
              </span>
              <span>使用 wagmi 实现钱包连接功能</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 dark:text-indigo-400 mr-2">
                •
              </span>
              <span>通过 wagmi 钩子获取钱包地址和连接状态</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 dark:text-indigo-400 mr-2">
                •
              </span>
              <span>处理钱包连接、断开连接和网络切换</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 dark:text-indigo-400 mr-2">
                •
              </span>
              <span>了解 Web3 Provider 的工作原理</span>
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
