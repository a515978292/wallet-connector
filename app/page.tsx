import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="flex w-full max-w-4xl flex-col items-center gap-12 px-6 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4 font-sans">
            🚀 DApp
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            钱包连接、智能合约交互
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <Link href="/wallet">
            <div className="group cursor-pointer rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-lg transition-all hover:shadow-2xl hover:scale-105 border border-gray-200 dark:border-gray-700">
              <div className="text-4xl mb-4">👛</div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                钱包连接器
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                学习如何使用 wagmi 连接 MetaMask 等多种 Web3 钱包
              </p>
              <div className="mt-6 text-indigo-600 dark:text-indigo-400 font-medium group-hover:translate-x-2 transition-transform inline-flex items-center">
                开始学习 →
              </div>
            </div>
          </Link>

          <Link href="/contract">
            <div className="group cursor-pointer rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-lg transition-all hover:shadow-2xl hover:scale-105 border border-gray-200 dark:border-gray-700">
              <div className="text-4xl mb-4">📝</div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                智能合约交互
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                学习如何读取和写入智能合约，使用 viem 和 wagmi 进行链上交互
              </p>
              <div className="mt-6 text-indigo-600 dark:text-indigo-400 font-medium group-hover:translate-x-2 transition-transform inline-flex items-center">
                开始学习 →
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            基于 Next.js 14、TypeScript、Tailwind CSS 构建
          </p>
        </div>
      </main>
    </div>
  );
}
