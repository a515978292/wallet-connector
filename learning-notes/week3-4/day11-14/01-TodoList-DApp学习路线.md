# 📋 Todo List DApp 学习路线

## 阶段一：智能合约开发与部署 (2-3小时)

### 步骤 1: 环境准备

- 安装 Hardhat 开发环境
- 配置测试网络（建议使用 Sepolia）
- 准备测试 ETH（从 faucet 获取）

### 步骤 2: 编写和测试智能合约

- 创建 TodoList.sol 合约（文档中已提供）
- 编写单元测试
- 本地部署测试
- 部署到 Sepolia 测试网

## 阶段二：前端开发 (3-4小时)

### 步骤 3: 准备合约信息

- 获取部署的合约地址
- 生成或准备 ABI（Application Binary Interface）

### 步骤 4: 创建前端组件

- 创建 TodoList 页面组件
- 实现添加待办事项 UI
- 实现待办列表展示 UI
- 实现完成/删除功能 UI
- 实现已完成筛选功能 UI

### 步骤 5: 集成 wagmi Hooks

- 使用 `useReadContract` 读取待办列表
- 使用 `useWriteContract` 实现添加功能/删除功能
- 使用 `useWaitForTransactionReceipt` 监听交易状态

## 阶段三：优化与测试 (1-2小时)

### 步骤 6: 用户体验优化

- 添加加载状态
- 添加错误处理
- 添加交易成功提示
- 实现自动刷新数据

### 步骤 7: 测试

- 测试所有功能流程
- 处理边界情况
- 优化 Gas 费用显示
