"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContractPage() {
  const [contractAddress, setContractAddress] = useState("");
  const [readValue, setReadValue] = useState("");
  const [writeValue, setWriteValue] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold text-gray-900 dark:text-white hover:text-indigo-600 transition-colors"
          >
            ← 返回首页
          </Link>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            智能合约交互
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            📝 智能合约交互
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            学习如何读取和写入智能合约数据
          </p>
        </div>

        <div className="space-y-6">
          {/* 合约地址输入 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              🎯 合约地址
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="输入智能合约地址 (0x...)"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                示例：0x5FbDB2315678afecb367f032d93F642f64180aa3
              </p>
            </div>
          </div>

          {/* 读取合约 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              👀 读取合约数据
            </h2>
            <div className="space-y-4">
              <button
                onClick={() => {
                  // TODO: 实现读取逻辑
                  setReadValue("示例值: 1000");
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                读取数据
              </button>
              {readValue && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    读取结果：
                  </p>
                  <p className="text-gray-900 dark:text-white font-mono">
                    {readValue}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 写入合约 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              ✍️ 写入合约数据
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="输入要写入的值"
                value={writeValue}
                onChange={(e) => setWriteValue(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                onClick={() => {
                  // TODO: 实现写入逻辑
                  alert(`准备写入: ${writeValue}`);
                }}
                className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                写入数据
              </button>
              <p className="text-sm text-yellow-600 dark:text-yellow-400">
                ⚠️ 写入操作需要消耗 Gas 费用
              </p>
            </div>
          </div>

          {/* 学习要点 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              📚 学习要点
            </h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-indigo-600 dark:text-indigo-400 mr-2">
                  •
                </span>
                <span>使用 viem 创建合约实例</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 dark:text-indigo-400 mr-2">
                  •
                </span>
                <span>读取合约（view/pure 函数）不需要 Gas</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 dark:text-indigo-400 mr-2">
                  •
                </span>
                <span>写入合约需要发送交易并支付 Gas 费用</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 dark:text-indigo-400 mr-2">
                  •
                </span>
                <span>使用 wagmi hooks 进行合约交互</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 dark:text-indigo-400 mr-2">
                  •
                </span>
                <span>处理交易状态和错误</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/wallet"
            className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
          >
            ← 上一步：钱包连接器
          </Link>
        </div>
      </main>
    </div>
  );
}
