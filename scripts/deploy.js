const hre = require("hardhat");

async function main() {
  console.log("开始部署 TodoList 合约...");

  // 获取合约工厂
  const TodoList = await hre.viem.deployContract("TodoList");

  console.log(`✅ TodoList 合约已部署!`);
  console.log(`📍 合约地址: ${TodoList.address}`);
  console.log(`🔗 区块链浏览器: https://sepolia.etherscan.io/address/${TodoList.address}`);

  // 保存合约地址到文件（方便前端使用）
  const fs = require("fs");
  const contractInfo = {
    address: TodoList.address,
    network: hre.network.name,
    deployedAt: new Date().toISOString(),
  };

  fs.writeFileSync(
    "./contract-address.json",
    JSON.stringify(contractInfo, null, 2)
  );

  console.log("\n📝 合约地址已保存到 contract-address.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
