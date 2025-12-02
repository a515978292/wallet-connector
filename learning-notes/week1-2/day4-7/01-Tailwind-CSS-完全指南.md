# 🎨 Tailwind CSS 完全指南

> 基于项目实战的 Tailwind CSS 系统学习指南

## 一、核心概念

### 什么是 Tailwind CSS？

Tailwind 是一个 **实用工具优先（Utility-First）** 的 CSS 框架。不写传统 CSS，而是直接在 HTML 上用类名组合样式。

**传统方式 vs Tailwind：**

```css
/* 传统 CSS */
.button {
  padding: 0.5rem 1.5rem;
  background-color: #4f46e5;
  color: white;
  border-radius: 0.5rem;
}
```

```tsx
/* Tailwind 方式 */
<button className="px-6 py-2 bg-indigo-600 text-white rounded-lg">按钮</button>
```

**优点：**

- 快速开发，不需要命名类名
- 代码更加一致性
- 响应式和状态变化简单
- 打包后 CSS 文件很小（只包含用到的类）

**缺点：**

- 类名很长，HTML 看起来乱
- 需要记忆类名规则
- 重复代码多（需要组件化解决）

---

## 二、基础语法规则

### 1. **布局类（Layout）**

#### 容器和尺寸

```tsx
// 项目中的例子：app/contract/page.tsx
<div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
  <main className="max-w-4xl mx-auto px-6 py-12">// 内容</main>
</div>
```

**类名拆解：**

- `min-h-screen` → `min-height: 100vh`（最小高度为整个屏幕）
- `max-w-4xl` → 最大宽度 56rem（896px）
- `mx-auto` → `margin: 0 auto`（水平居中）
- `px-6` → `padding-left/right: 1.5rem`（24px）
- `py-12` → `padding-top/bottom: 3rem`（48px）

#### 常用布局类速查

| 类名           | CSS 效果            | 说明       |
| -------------- | ------------------- | ---------- |
| `w-full`       | `width: 100%`       | 宽度 100%  |
| `w-1/2`        | `width: 50%`        | 宽度 50%   |
| `w-64`         | `width: 16rem`      | 固定宽度   |
| `max-w-4xl`    | `max-width: 56rem`  | 最大宽度   |
| `h-screen`     | `height: 100vh`     | 高度 100vh |
| `min-h-screen` | `min-height: 100vh` | 最小高度   |
| `m-4`          | `margin: 1rem`      | 四周边距   |
| `mx-auto`      | `margin: 0 auto`    | 水平居中   |
| `mt-8`         | `margin-top: 2rem`  | 上边距     |
| `p-4`          | `padding: 1rem`     | 四周内边距 |
| `px-6`         | 左右内边距          | 1.5rem     |
| `py-2`         | 上下内边距          | 0.5rem     |

---

### 2. **Flexbox 布局**

```tsx
// 项目中的例子：app/components/PageHeader.tsx
<div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
  <Link href="/">← 返回首页</Link>
  <div>智能合约交互</div>
</div>
```

**类名拆解：**

- `flex` → `display: flex`
- `items-center` → `align-items: center`（垂直居中）
- `justify-between` → `justify-content: space-between`（两端对齐）

#### Flexbox 速查表

| 类名              | CSS 效果                         | 说明             |
| ----------------- | -------------------------------- | ---------------- |
| `flex`            | `display: flex`                  | 开启 flex        |
| `flex-col`        | `flex-direction: column`         | 垂直排列         |
| `flex-row`        | `flex-direction: row`            | 水平排列（默认） |
| `items-start`     | `align-items: flex-start`        | 顶部对齐         |
| `items-center`    | `align-items: center`            | 垂直居中         |
| `items-end`       | `align-items: flex-end`          | 底部对齐         |
| `justify-start`   | `justify-content: flex-start`    | 左对齐           |
| `justify-center`  | `justify-content: center`        | 水平居中         |
| `justify-end`     | `justify-content: flex-end`      | 右对齐           |
| `justify-between` | `justify-content: space-between` | 两端对齐         |
| `gap-4`           | `gap: 1rem`                      | 元素间距         |
| `space-x-4`       | 水平间距                         | 子元素间距       |
| `space-y-4`       | 垂直间距                         | 子元素间距       |

---

### 3. **颜色和背景**

#### 颜色命名规则

Tailwind 使用 **颜色名-深度** 的格式：

```tsx
// 项目中的例子
<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
  <h2 className="text-gray-900 dark:text-white">标题</h2>
  <button className="bg-blue-600 hover:bg-blue-700">按钮</button>
</div>
```

#### 颜色系统

**深度范围：50（最浅）→ 900（最深）**

| 颜色系列          | 适用场景         |
| ----------------- | ---------------- |
| `gray/slate/zinc` | 文字、边框、背景 |
| `red`             | 错误、删除、警告 |
| `orange`          | 警告、通知       |
| `yellow`          | 提示、警告       |
| `green`           | 成功、确认       |
| `blue`            | 链接、主要操作   |
| `indigo`          | 品牌色、重要按钮 |
| `purple/violet`   | 特殊功能         |

#### 常用颜色类

```tsx
// 背景色
bg - white; // 白色
bg - gray - 100; // 浅灰
bg - gray - 800; // 深灰
bg - indigo - 600; // 品牌色

// 文字颜色
text - gray - 900; // 主要文字
text - gray - 600; // 次要文字
text - gray - 400; // 辅助文字
text - white; // 白色文字

// 边框颜色
border - gray - 300; // 边框
border - blue - 500; // 强调边框
```

---

### 4. **Dark Mode（暗黑模式）**

Tailwind 使用 `dark:` 前缀实现暗黑模式：

```tsx
// 项目中的例子
<div className="bg-white dark:bg-gray-800">
  <h1 className="text-gray-900 dark:text-white">标题</h1>
  <p className="text-gray-600 dark:text-gray-300">内容</p>
</div>
```

**语法规则：**

- `类名 dark:类名` → 亮色模式用前者，暗色模式用后者
- 系统会根据用户的系统设置自动切换

#### 常用暗黑模式组合

```tsx
// 背景
bg-white dark:bg-gray-800
bg-gray-100 dark:bg-gray-900

// 文字
text-gray-900 dark:text-white
text-gray-600 dark:text-gray-300
text-gray-500 dark:text-gray-400

// 边框
border-gray-300 dark:border-gray-600
border-gray-200 dark:border-gray-700
```

---

### 5. **间距系统**

Tailwind 使用 **数字 × 0.25rem（4px）** 的间距系统：

| 类名   | rem     | px   |
| ------ | ------- | ---- |
| `p-1`  | 0.25rem | 4px  |
| `p-2`  | 0.5rem  | 8px  |
| `p-4`  | 1rem    | 16px |
| `p-6`  | 1.5rem  | 24px |
| `p-8`  | 2rem    | 32px |
| `p-12` | 3rem    | 48px |
| `p-16` | 4rem    | 64px |

#### 间距方向

```tsx
// 单方向
mt - 4; // margin-top
mb - 4; // margin-bottom
ml - 4; // margin-left
mr - 4; // margin-right

// 双方向
mx - 4; // margin-left + margin-right
my - 4; // margin-top + margin-bottom

// 四方向
m - 4; // 四周 margin
p - 4; // 四周 padding
```

#### 子元素间距

```tsx
// 项目中的例子
<div className="space-y-4">
  <div>元素 1</div>
  <div>元素 2</div>
  <div>元素 3</div>
</div>
```

- `space-y-4` → 子元素之间垂直间距 1rem
- `space-x-4` → 子元素之间水平间距 1rem

---

### 6. **圆角和阴影**

#### 圆角

```tsx
// 项目中的例子
<div className="rounded-2xl shadow-xl p-8">// 内容</div>
```

| 类名           | 圆角大小 |
| -------------- | -------- |
| `rounded-none` | 0        |
| `rounded-sm`   | 2px      |
| `rounded`      | 4px      |
| `rounded-md`   | 6px      |
| `rounded-lg`   | 8px      |
| `rounded-xl`   | 12px     |
| `rounded-2xl`  | 16px     |
| `rounded-3xl`  | 24px     |
| `rounded-full` | 完全圆形 |

#### 阴影

```tsx
shadow-sm     // 小阴影
shadow        // 标准阴影
shadow-md     // 中等阴影
shadow-lg     // 大阴影
shadow-xl     // 超大阴影
shadow-2xl    // 巨大阴影
shadow-none   // 无阴影
```

---

### 7. **文字样式**

```tsx
// 项目中的例子
<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
  📝 智能合约交互
</h1>
<p className="text-lg text-gray-600 dark:text-gray-300">
  学习如何读取和写入智能合约数据
</p>
```

#### 字体大小

| 类名        | rem      | px   | 适用场景     |
| ----------- | -------- | ---- | ------------ |
| `text-xs`   | 0.75rem  | 12px | 辅助文字     |
| `text-sm`   | 0.875rem | 14px | 小号文字     |
| `text-base` | 1rem     | 16px | 正文（默认） |
| `text-lg`   | 1.125rem | 18px | 略大文字     |
| `text-xl`   | 1.25rem  | 20px | 副标题       |
| `text-2xl`  | 1.5rem   | 24px | 小标题       |
| `text-3xl`  | 1.875rem | 30px | 标题         |
| `text-4xl`  | 2.25rem  | 36px | 大标题       |
| `text-5xl`  | 3rem     | 48px | 主标题       |

#### 字重（粗细）

```tsx
font - thin; // 100
font - extralight; // 200
font - light; // 300
font - normal; // 400
font - medium; // 500
font - semibold; // 600
font - bold; // 700
font - extrabold; // 800
font - black; // 900
```

#### 文字对齐

```tsx
text - left; // 左对齐
text - center; // 居中
text - right; // 右对齐
text - justify; // 两端对齐
```

#### 其他文字样式

```tsx
italic; // 斜体
underline; // 下划线
line - through; // 删除线
uppercase; // 大写
lowercase; // 小写
capitalize; // 首字母大写
```

---

### 8. **交互效果（Hover/Focus/Active）**

#### Hover（鼠标悬停）

```tsx
// 项目中的例子
<button className="bg-blue-600 hover:bg-blue-700 transition-colors">
  读取数据
</button>

<Link className="text-indigo-600 hover:underline">
  下一步 →
</Link>
```

**常用 hover 效果：**

```tsx
hover: bg - blue - 700; // 悬停改变背景色
hover: text - white; // 悬停改变文字色
hover: scale - 105; // 悬停放大 1.05 倍
hover: shadow - xl; // 悬停增加阴影
hover: translate - x - 2; // 悬停向右移动
hover: underline; // 悬停显示下划线
```

#### Focus（聚焦）

```tsx
// 项目中的输入框例子
<input
  className="w-full px-4 py-3 border border-gray-300 rounded-lg
             focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
/>
```

**聚焦效果组合：**

- `focus:ring-2` → 聚焦时显示 2px 的环形高亮
- `focus:ring-indigo-500` → 高亮颜色
- `focus:border-transparent` → 聚焦时边框透明（避免重复）
- `focus:outline-none` → 移除默认的轮廓

#### Active（激活）

```tsx
active: scale - 95; // 点击时缩小
active: bg - blue - 800; // 点击时背景变深
```

#### 过渡动画

```tsx
transition; // 所有属性过渡
transition - colors; // 颜色过渡
transition - transform; // 变形过渡
transition - opacity; // 透明度过渡

duration - 150; // 持续 150ms
duration - 300; // 持续 300ms（默认）
duration - 500; // 持续 500ms
```

**完整按钮示例：**

```tsx
<button
  className="
  px-6 py-2 
  bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800
  text-white font-medium
  rounded-lg shadow-md hover:shadow-xl
  transform hover:scale-105 active:scale-95
  transition-all duration-200
"
>
  提交
</button>
```

---

### 9. **响应式设计**

Tailwind 默认 **移动优先**，使用断点前缀：

```tsx
// 项目首页的例子
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
  <div>卡片 1</div>
  <div>卡片 2</div>
</div>
```

**含义：**

- 默认（移动端）：1 列
- 中等屏幕及以上（md: 768px+）：2 列

#### 断点系统

| 前缀   | 最小宽度 | 设备                 |
| ------ | -------- | -------------------- |
| 无前缀 | 0px      | 所有设备（移动优先） |
| `sm:`  | 640px    | 大手机 / 小平板      |
| `md:`  | 768px    | 平板                 |
| `lg:`  | 1024px   | 小笔记本             |
| `xl:`  | 1280px   | 桌面                 |
| `2xl:` | 1536px   | 大屏桌面             |

#### 响应式实例

```tsx
// 宽度响应式
<div className="w-full md:w-1/2 lg:w-1/3">
  {/* 移动端全宽，平板 50%，桌面 33% */}
</div>

// 文字大小响应式
<h1 className="text-2xl md:text-4xl lg:text-5xl">
  标题
</h1>

// 显示/隐藏响应式
<div className="hidden md:block">
  {/* 移动端隐藏，平板以上显示 */}
</div>

// padding 响应式
<div className="px-4 md:px-8 lg:px-12">
  {/* 移动端小边距，屏幕越大边距越大 */}
</div>

// flex 方向响应式
<div className="flex flex-col md:flex-row">
  {/* 移动端垂直，平板以上水平 */}
</div>
```

---

## 三、实战解析（基于项目代码）

### 实战 1：按钮组件

```tsx
// app/contract/page.tsx - 读取数据按钮
<button
  onClick={() => setReadValue("示例值: 1000")}
  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
>
  读取数据
</button>
```

**逐个拆解：**

1. `px-6` → 左右内边距 1.5rem（24px）
2. `py-2` → 上下内边距 0.5rem（8px）
3. `bg-blue-600` → 蓝色背景 #2563eb
4. `text-white` → 白色文字
5. `rounded-lg` → 圆角 8px
6. `font-medium` → 字重 500（中等粗细）
7. `hover:bg-blue-700` → 悬停时背景变为 #1d4ed8（更深的蓝）
8. `transition-colors` → 颜色变化有过渡动画

**对比三种按钮颜色：**

```tsx
// 主要按钮（蓝色）
<button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
  读取
</button>

// 成功按钮（绿色）
<button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">
  写入
</button>

// 危险按钮（红色）
<button className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg">
  断开
</button>
```

---

### 实战 2：输入框组件

```tsx
// app/contract/page.tsx - 合约地址输入
<input
  type="text"
  placeholder="输入智能合约地址 (0x...)"
  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 
             rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
             focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
/>
```

**逐个拆解：**

1. `w-full` → 宽度 100%
2. `px-4 py-3` → 内边距（左右 1rem，上下 0.75rem）
3. `border border-gray-300` → 1px 灰色边框
4. `dark:border-gray-600` → 暗黑模式下边框更深
5. `rounded-lg` → 圆角 8px
6. `bg-white dark:bg-gray-700` → 背景色（亮色白色，暗色深灰）
7. `text-gray-900 dark:text-white` → 文字颜色
8. `focus:ring-2` → 聚焦时显示 2px 环形高亮
9. `focus:ring-indigo-500` → 高亮颜色为靛蓝色
10. `focus:border-transparent` → 聚焦时隐藏边框（避免和 ring 重叠）

---

### 实战 3：卡片组件

```tsx
// app/contract/page.tsx - 卡片容器
<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
    🎯 合约地址
  </h2>
  <div className="space-y-4">{/* 内容 */}</div>
</div>
```

**结构分析：**

**外层容器：**

- `bg-white dark:bg-gray-800` → 背景色（亮色白，暗色深灰）
- `rounded-2xl` → 大圆角 16px
- `shadow-xl` → 超大阴影，增加层次感
- `p-8` → 四周内边距 2rem（32px）

**标题：**

- `text-2xl` → 字体 24px
- `font-semibold` → 字重 600（半粗体）
- `text-gray-900 dark:text-white` → 文字颜色
- `mb-4` → 底部间距 1rem

**内容区：**

- `space-y-4` → 子元素之间垂直间距 1rem

---

### 实战 4：导航栏组件

```tsx
// app/components/PageHeader.tsx
<nav
  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm 
                border-b border-gray-200 dark:border-gray-700"
>
  <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
    <Link
      href="/"
      className="text-xl font-bold text-gray-900 dark:text-white 
                              hover:text-indigo-600 dark:hover:text-indigo-400 
                              transition-colors"
    >
      ← 返回首页
    </Link>
    <div className="text-sm text-gray-600 dark:text-gray-300">智能合约交互</div>
  </div>
</nav>
```

**逐个拆解：**

**导航栏背景：**

- `bg-white/80` → 白色背景，80% 不透明度（半透明）
- `backdrop-blur-sm` → 背景模糊效果（毛玻璃）
- `border-b` → 底部边框
- `border-gray-200` → 边框颜色

**内容容器：**

- `max-w-6xl mx-auto` → 最大宽度 72rem，水平居中
- `flex items-center justify-between` → Flex 布局，垂直居中，两端对齐

**链接样式：**

- `text-xl font-bold` → 大号粗体文字
- `hover:text-indigo-600` → 悬停时文字变靛蓝色
- `transition-colors` → 颜色过渡动画

---

### 实战 5：首页卡片

```tsx
// app/page.tsx - 首页卡片
<Link href="/wallet">
  <div
    className="group cursor-pointer rounded-2xl bg-white dark:bg-gray-800 
                  p-8 shadow-lg transition-all hover:shadow-2xl hover:scale-105 
                  border border-gray-200 dark:border-gray-700"
  >
    <div className="text-4xl mb-4">👛</div>
    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
      钱包连接器
    </h2>
    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
      学习如何使用 wagmi 连接 MetaMask 等多种 Web3 钱包
    </p>
    <div
      className="mt-6 text-indigo-600 dark:text-indigo-400 font-medium 
                    group-hover:translate-x-2 transition-transform inline-flex items-center"
    >
      开始学习 →
    </div>
  </div>
</Link>
```

**高级技巧：**

1. **group 类：** 父元素添加 `group`，子元素可以用 `group-hover:` 响应父元素的悬停

   ```tsx
   <div className="group">
     <span className="group-hover:translate-x-2">→</span>
   </div>
   ```

2. **组合动画：**

   - `transition-all` → 所有属性都有过渡
   - `hover:shadow-2xl` → 悬停时阴影增大
   - `hover:scale-105` → 悬停时放大 1.05 倍

3. **文字行高：**
   - `leading-relaxed` → `line-height: 1.625`（行高稍宽松）

---

## 四、常用组合模式

### 模式 1：卡片组件

```tsx
// 基础卡片
<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
  {/* 内容 */}
</div>

// 可交互卡片
<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6
                hover:shadow-2xl hover:scale-105 transition-all cursor-pointer">
  {/* 内容 */}
</div>

// 边框卡片
<div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200
                dark:border-gray-700 p-6">
  {/* 内容 */}
</div>
```

### 模式 2：按钮组件

```tsx
// 主要按钮（Primary）
<button className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium
                   hover:bg-indigo-700 transition-colors shadow-md">
  提交
</button>

// 次要按钮（Secondary）
<button className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900
                   dark:text-white rounded-lg font-medium hover:bg-gray-300
                   dark:hover:bg-gray-600 transition-colors">
  取消
</button>

// 轮廓按钮（Outline）
<button className="px-6 py-2 border border-indigo-600 text-indigo-600
                   rounded-lg font-medium hover:bg-indigo-50
                   dark:hover:bg-indigo-900/20 transition-colors">
  了解更多
</button>

// 文字按钮（Text）
<button className="text-indigo-600 hover:text-indigo-700
                   hover:underline transition-colors">
  查看详情
</button>
```

### 模式 3：输入框组件

```tsx
// 标准输入框
<input className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600
                  rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  transition-colors" />

// 带图标的输入框
<div className="relative">
  <input className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                    focus:ring-2 focus:ring-blue-500" />
  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
    🔍
  </span>
</div>

// 错误状态输入框
<input className="w-full px-4 py-2 border-2 border-red-500 rounded-lg
                  focus:ring-2 focus:ring-red-500 bg-red-50" />
```

### 模式 4：容器布局

```tsx
// 页面容器
<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100
                dark:from-gray-900 dark:to-gray-800">
  <main className="max-w-4xl mx-auto px-6 py-12">
    {/* 内容 */}
  </main>
</div>

// 居中容器
<div className="flex items-center justify-center min-h-screen">
  <div className="max-w-md w-full">
    {/* 居中内容 */}
  </div>
</div>

// 网格布局
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>项目 1</div>
  <div>项目 2</div>
  <div>项目 3</div>
</div>
```

### 模式 5：导航栏

```tsx
// 顶部导航
<nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm
                border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
  <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
    <div className="text-xl font-bold">Logo</div>
    <div className="flex gap-4">
      <a href="#" className="hover:text-indigo-600 transition-colors">链接</a>
    </div>
  </div>
</nav>

// 侧边栏
<aside className="w-64 h-screen bg-white dark:bg-gray-800 border-r
                  border-gray-200 dark:border-gray-700 p-6">
  {/* 侧边栏内容 */}
</aside>
```

---

## 五、进阶技巧

### 技巧 1：使用 `@apply` 提取重复样式

当你发现相同的类名组合重复出现时，可以在 CSS 中提取：

```css
/* app/globals.css */
@layer components {
  .btn-primary {
    @apply px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium 
           hover:bg-indigo-700 transition-colors shadow-md;
  }

  .btn-secondary {
    @apply px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 
           dark:text-white rounded-lg font-medium hover:bg-gray-300 
           transition-colors;
  }

  .card {
    @apply bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8;
  }

  .input {
    @apply w-full px-4 py-2 border border-gray-300 dark:border-gray-600 
           rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
           focus:ring-2 focus:ring-indigo-500 focus:border-transparent;
  }
}
```

然后在组件中使用：

```tsx
<button className="btn-primary">提交</button>
<div className="card">内容</div>
<input className="input" />
```

**注意：**

- 只在真正重复的样式组合上使用 `@apply`
- 不要过度使用，失去了 Tailwind 的灵活性

---

### 技巧 2：创建可复用组件

比传统 CSS 更好的方式是创建 React 组件：

```tsx
// components/Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick
}: ButtonProps) {
  const baseClasses = "rounded-lg font-medium transition-colors";

  const variantClasses = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
    secondary: "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 text-gray-900 dark:text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white"
  };

  const sizeClasses = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-6 py-2",
    lg: "px-8 py-3 text-lg"
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// 使用
<Button variant="primary" size="md">提交</Button>
<Button variant="danger" size="sm">删除</Button>
```

---

### 技巧 3：使用 clsx 或 classnames 管理类名

当类名逻辑复杂时，使用工具库：

```bash
npm install clsx
```

```tsx
import clsx from "clsx";

function Button({ isActive, isDisabled, children }) {
  return (
    <button
      className={clsx(
        // 基础样式
        "px-6 py-2 rounded-lg font-medium transition-colors",
        // 条件样式
        {
          "bg-indigo-600 text-white": isActive,
          "bg-gray-200 text-gray-600": !isActive,
          "opacity-50 cursor-not-allowed": isDisabled,
          "hover:bg-indigo-700": isActive && !isDisabled,
        }
      )}
    >
      {children}
    </button>
  );
}
```

---

### 技巧 4：自定义配置（高级）

如果需要自定义颜色、间距等，可以在 `tailwind.config.js` 中配置：

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          // ... 自定义颜色
          900: "#0c4a6e",
        },
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
};
```

然后使用：

```tsx
<div className="bg-brand-600 p-128 rounded-4xl">自定义样式</div>
```

---

### 技巧 5：使用插件

Tailwind 有很多官方和社区插件：

```bash
# 表单样式插件
npm install @tailwindcss/forms

# 排版插件
npm install @tailwindcss/typography

# 行截断插件
npm install @tailwindcss/line-clamp
```

```js
// tailwind.config.js
module.exports = {
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
```

---

## 六、性能优化

### 1. 只打包用到的类名

Tailwind 会自动扫描你的代码，只打包用到的类名。确保 `tailwind.config.js` 配置正确：

```js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  // ...
};
```

### 2. 避免动态类名

❌ **错误做法（不会被打包）：**

```tsx
const color = "blue";
<div className={`text-${color}-600`}>文字</div>;
```

✅ **正确做法：**

```tsx
const colorMap = {
  blue: "text-blue-600",
  red: "text-red-600",
};
<div className={colorMap[color]}>文字</div>;
```

### 3. 使用 JIT 模式

Tailwind 4.x 默认使用 JIT（Just-In-Time）模式，实时编译需要的类名，开发体验更好。

---

## 七、调试技巧

### 1. VS Code 插件

安装 **Tailwind CSS IntelliSense** 插件：

- 自动补全类名
- 悬停显示实际 CSS
- 类名语法高亮
- 自动排序（可选）

### 2. 浏览器开发者工具

1. 打开浏览器开发者工具（F12）
2. 选择元素
3. 查看 Styles 面板，可以看到 Tailwind 类名对应的实际 CSS
4. 实时修改测试效果

### 3. Tailwind Play

在线测试平台：https://play.tailwindcss.com/
可以快速测试样式，无需本地环境。

---

## 八、速查表

### 常用类名速查

| 功能         | Tailwind 类名                 | CSS 等价                                               |
| ------------ | ----------------------------- | ------------------------------------------------------ |
| **布局**     |
| Flex 布局    | `flex`                        | `display: flex`                                        |
| Flex 垂直    | `flex-col`                    | `flex-direction: column`                               |
| 居中对齐     | `items-center justify-center` | `align-items: center; justify-content: center`         |
| 网格布局     | `grid grid-cols-3`            | `display: grid; grid-template-columns: repeat(3, 1fr)` |
| **尺寸**     |
| 全宽         | `w-full`                      | `width: 100%`                                          |
| 全屏高       | `h-screen`                    | `height: 100vh`                                        |
| 最大宽度     | `max-w-4xl`                   | `max-width: 56rem`                                     |
| **间距**     |
| 内边距       | `p-4`                         | `padding: 1rem`                                        |
| 外边距       | `m-4`                         | `margin: 1rem`                                         |
| 左右边距     | `mx-4`                        | `margin-left/right: 1rem`                              |
| 上下边距     | `my-4`                        | `margin-top/bottom: 1rem`                              |
| 居中         | `mx-auto`                     | `margin: 0 auto`                                       |
| **颜色**     |
| 白色背景     | `bg-white`                    | `background-color: #fff`                               |
| 深灰背景     | `bg-gray-800`                 | `background-color: #1f2937`                            |
| 蓝色文字     | `text-blue-600`               | `color: #2563eb`                                       |
| **文字**     |
| 大标题       | `text-4xl`                    | `font-size: 2.25rem`                                   |
| 粗体         | `font-bold`                   | `font-weight: 700`                                     |
| 居中         | `text-center`                 | `text-align: center`                                   |
| **边框**     |
| 圆角         | `rounded-lg`                  | `border-radius: 0.5rem`                                |
| 完全圆       | `rounded-full`                | `border-radius: 9999px`                                |
| 边框         | `border`                      | `border-width: 1px`                                    |
| **阴影**     |
| 标准阴影     | `shadow`                      | `box-shadow: 0 1px 3px rgba(0,0,0,0.1)`                |
| 大阴影       | `shadow-xl`                   | `box-shadow: 0 20px 25px rgba(0,0,0,0.15)`             |
| **交互**     |
| 悬停变色     | `hover:bg-blue-700`           | `:hover { background-color: #1d4ed8 }`                 |
| 聚焦高亮     | `focus:ring-2`                | `:focus { box-shadow: 0 0 0 2px }`                     |
| 过渡动画     | `transition-colors`           | `transition-property: color, background-color...`      |
| **暗黑模式** |
| 暗色背景     | `dark:bg-gray-800`            | `@media (prefers-color-scheme: dark) { ... }`          |
| **响应式**   |
| 平板以上     | `md:w-1/2`                    | `@media (min-width: 768px) { width: 50% }`             |
| 桌面以上     | `lg:grid-cols-3`              | `@media (min-width: 1024px) { ... }`                   |

---

## 九、常见问题

### Q1: 类名太长怎么办？

**A:** 有几个解决方案：

1. 提取成组件（推荐）
2. 使用 `@apply` 提取重复样式
3. 安装 Prettier 插件自动格式化
4. 使用 clsx 分离条件逻辑

### Q2: 为什么动态类名不生效？

**A:** Tailwind 在构建时扫描完整的类名字符串，动态拼接不会被识别。

```tsx
// ❌ 错误
<div className={`text-${color}-600`}>

// ✅ 正确
const classes = { blue: 'text-blue-600', red: 'text-red-600' };
<div className={classes[color]}>
```

### Q3: 如何调试样式不生效的问题？

**A:** 检查步骤：

1. 检查类名拼写是否正确
2. 检查是否有 CSS 特异性冲突
3. 检查是否被其他样式覆盖（开发者工具查看）
4. 检查 Tailwind 配置的 `content` 路径是否包含该文件

### Q4: 暗黑模式如何启用？

**A:** Tailwind 默认根据系统偏好自动启用。如果要手动控制：

```js
// tailwind.config.js
module.exports = {
  darkMode: "class", // 改为 class 模式
  // ...
};
```

然后在根元素添加 `dark` 类：

```tsx
<html className={isDark ? 'dark' : ''}>
```

### Q5: 如何自定义颜色和间距？

**A:** 在 `tailwind.config.js` 中配置：

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#5b21b6",
      },
      spacing: {
        128: "32rem",
      },
    },
  },
};
```

---

## 十、学习路径建议

### 第一阶段：基础（1-2 天）

- [ ] 理解 Utility-First 概念
- [ ] 学习布局类（flex, grid, 间距）
- [ ] 学习颜色和文字类
- [ ] 练习：复刻一个简单按钮

### 第二阶段：进阶（3-5 天）

- [ ] 学习响应式设计（断点系统）
- [ ] 学习暗黑模式
- [ ] 学习交互效果（hover, focus）
- [ ] 练习：复刻一个卡片组件

### 第三阶段：实战（1 周）

- [ ] 构建完整页面布局
- [ ] 提取可复用组件
- [ ] 学习 @apply 和自定义配置
- [ ] 练习：构建一个完整的表单页面

### 第四阶段：优化（持续）

- [ ] 学习性能优化
- [ ] 学习设计系统思维
- [ ] 探索插件生态
- [ ] 建立自己的组件库

---

## 十一、参考资源

### 官方资源

- 官方文档：https://tailwindcss.com/docs
- Tailwind Play（在线测试）：https://play.tailwindcss.com
- Tailwind UI（付费组件库）：https://tailwindui.com

### 社区资源

- Tailwind Components：https://tailwindcomponents.com
- Headless UI（无样式组件库）：https://headlessui.com
- daisyUI（组件库）：https://daisyui.com

### VS Code 插件

- Tailwind CSS IntelliSense（必装）
- Tailwind Documentation（快速查文档）
- Headwind（自动排序类名，可选）

### 学习视频

- Tailwind Labs 官方 YouTube 频道
- Traversy Media 的 Tailwind Crash Course

---

## 十二、练习任务

基于你的项目，完成这些任务来巩固学习：

### 任务 1：修改按钮样式

在 `app/contract/page.tsx` 中：

- [ ] 把 "读取数据" 按钮改成紫色（`bg-purple-600`）
- [ ] 添加阴影效果（`shadow-md hover:shadow-xl`）
- [ ] 添加点击动画（`active:scale-95`）

### 任务 2：优化输入框

- [ ] 给输入框添加错误状态（红色边框）
- [ ] 添加一个带图标的搜索框
- [ ] 添加 disabled 状态样式

### 任务 3：创建新组件

- [ ] 创建一个 Alert 组件（支持 success/warning/error 三种类型）
- [ ] 创建一个 Badge 组件（小标签）
- [ ] 创建一个 Loading 组件（加载动画）

### 任务 4：响应式优化

- [ ] 把首页的卡片网格改为响应式（移动端 1 列，平板 2 列，桌面 3 列）
- [ ] 调整移动端的 padding（减小边距）
- [ ] 添加一个只在桌面端显示的侧边栏

### 任务 5：暗黑模式优化

- [ ] 检查所有页面的暗黑模式是否完善
- [ ] 添加暗黑模式切换按钮
- [ ] 优化暗黑模式下的颜色对比度

---

## 总结

**Tailwind CSS 的核心思想：**

1. **Utility-First**：用原子类组合样式，而非写 CSS
2. **类名即文档**：看类名就知道样式，无需查看 CSS 文件
3. **约束带来自由**：统一的设计系统（颜色、间距）让设计更一致
4. **组件化思维**：重复的组合提取成组件，而非 CSS 类

**记忆技巧：**

- **布局**：`flex`, `grid`, `max-w`, `mx-auto`
- **间距**：数字 × 0.25rem（4 = 1rem = 16px）
- **颜色**：名字-深度（`blue-600`，数字越大越深）
- **交互**：前缀（`hover:`, `focus:`, `active:`）
- **响应式**：断点（`sm:`, `md:`, `lg:`, `xl:`）
- **暗黑**：`dark:` 前缀

**最佳实践：**

1. 先用 Tailwind 快速实现功能
2. 发现重复后提取成组件
3. 保持类名的可读性（适当换行）
4. 使用 VS Code 插件提高效率
5. 遵循设计系统的颜色和间距

现在开始动手实践吧！在项目中多尝试，很快就能熟练掌握 Tailwind CSS 了。🚀
