import { useBlockNumber, useWatchBlockNumber, useConnection } from "wagmi";

/**
 * 自定义 Hook：获取最新区块号
 *
 * 作用：实时获取当前连接链的最新区块号
 * - 自动更新：当有新块生成时，区块号会自动更新
 * - 依赖连接状态：只有在钱包连接时才会获取区块号
 *
 * 返回值：
 * - blockNumber: 当前链的最新区块号（bigint | undefined）
 * - isLoading: 是否正在加载区块号（boolean）
 * - isError: 获取区块号时是否出错（boolean）
 */

export const useLatestBlockNumber = () => {
  const { isConnected } = useConnection();
  const {
    data: blockNumber,
    isLoading,
    isError,
  } = useBlockNumber({
    watch: isConnected, // 开启监听，区块号会自动更新
    query: { enabled: isConnected }, // 仅在已连接时查询
  });
  console.log("useLatestBlockNumber", { blockNumber, isLoading, isError });

  return { blockNumber, isLoading, isError };
};

/** 自定义 Hook：监听最新区块号变化并执行回调
 *
 * 作用：当有新块生成时，执行传入的回调函数
 */
export const useLatestBlockNumber_Watch = (
  cb: (blockNumber: bigint) => void
) => {
  // 使用 useWatchBlockNumber 监听区块号变化
  useWatchBlockNumber({
    onBlockNumber: (blockNumber) => {
      cb(blockNumber);
    },
  });
};
