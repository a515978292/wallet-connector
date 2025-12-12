/* eslint-disable @typescript-eslint/no-require-imports */
const hre = require("hardhat");

async function main() {
  console.log("开始部署 TodoList 合约...");

  // 获取合约工厂
  const TodoList = await hre.viem.deployContract("TodoList");

  console.log(`✅ TodoList 合约已部署!`);
  console.log(`📍 合约地址: ${TodoList.address}`);
  console.log(
    `🔗 区块链浏览器: https://sepolia.etherscan.io/address/${TodoList.address}`
  );

  // 保存合约地址到文件（方便前端使用）
  const fs = require("fs");
  const path = require("path");

  const contractInfo = {
    address: TodoList.address,
    network: hre.network.name,
    deployedAt: new Date().toISOString(),
  };

  // 确保 hardhat/result 目录存在
  const resultDir = path.join(__dirname, "../result");
  if (!fs.existsSync(resultDir)) {
    fs.mkdirSync(resultDir, { recursive: true });
  }

  // 保存到 hardhat/result/contract-address.json
  const outputPath = path.join(resultDir, "contract-address.json");
  fs.writeFileSync(outputPath, JSON.stringify(contractInfo, null, 2));

  console.log(`\n📝 合约地址已保存到 ${outputPath}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
