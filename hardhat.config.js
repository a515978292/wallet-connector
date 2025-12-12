/* eslint-disable @typescript-eslint/no-require-imports */
require("@nomicfoundation/hardhat-viem");
require("dotenv").config({
  path: process.env.DOTENV_CONFIG_PATH || ".env.local",
});

/** @type import('hardhat/config').HardhatUserConfig */
console.log("SEPOLIA_RPC_URL", process.env.SEPOLIA_RPC_URL);
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    // 本地 Hardhat 网络（开发测试用）
    hardhat: {
      chainId: 31337,
    },
    // Sepolia 测试网配置
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "https://rpc.sepolia.org",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 11155111,
      timeout: 120000, // 添加：120秒超时（120000毫秒）
      httpHeaders: {
        Connection: "keep-alive",
      },
    },
  },
  paths: {
    sources: "./hardhat/contracts",
    tests: "./hardhat/test",
    cache: "./hardhat/cache",
    artifacts: "./hardhat/artifacts",
  },
};
