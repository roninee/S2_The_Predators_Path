#### 绿颜色：顺应直觉，降低饱和度

**Topic: Red/Green Cognitive Load**

- **认知摩擦 (Friction)：** A股行情软件全是“红涨绿跌”。如果你在 Titan OS 里用“绿涨红跌”（西方），你的大脑在切换窗口时需要 0.5秒 的翻译时间。**在超短线交易中，这 0.5秒 是致命的。**
- **心理刺激 (Dopamine)：** 你担心红色刺激赌性。
- **解决方案：** **采用“红涨绿跌”（符合A股习惯），但调整色值。**
  - 不要用鲜艳的“大红” (`#ff0000`)。
  - 使用**“暗红/砖红”** (`#ef4444` 或更暗) 代表涨。
  - 使用**“冷绿/青绿”** (`#10b981`) 代表跌。
  - **理由：** 顺应直觉（减少翻译成本），但降低饱和度（减少情绪刺激）。

**颜色心理学 (A股定制)：**

- **涨 (Win/Up):** 暗红/砖红 (`#b91c1c`) —— 顺应A股直觉，但降低饱和度以抑制赌性。
- **跌 (Loss/Down):** 冷绿/青绿 (`#059669`) —— 代表冷静的止损。
- **中性/笔记 (Note):** 钴蓝 (`#3b82f6`) —— 代表理性的观察。
- **背景 (Bg):** 深空黑/Slate-950 (`#020617`) —— 极致的专注，无光污染。

### 1.2 交互逻辑：双透镜模式 (Dual-Lens Mode)

系统只有一个核心数据集，但有两种观察方式：

1. **时间透镜 (Calendar View):** 默认状态。用于复盘节奏、查看盈亏分布。
2. **列表透镜 (List View):** 搜索状态。当用户输入字符时，时间消失，逻辑浮现。用于寻找规律（Pattern）。

### 1.3 数据主权：Mapping Stream

- 用户的每一次输入（无论是盘中想法、生活博弈、还是实盘记录），本质上都是一条 **Stream（流）**。
- 我们不强求用户填写复杂的表单。用户只需在右侧面板像写代码一样输入 `Trigger -> Pattern -> Mapping`，系统负责将其结构化。

**[UC-04] 模糊搜索 (Fuzzy Search):**

- 使用 `Fuse.js`。
- **搜索权重：** `tags` (0.4) > `content` (0.3) > `title` (0.2) > `date` (0.1)。
- 这意味着如果用户搜“打板”，标签里有打板的记录排在最前，正文里提到的排在后面。

### 4.3 输入中枢：Mapping Panel (The Input Stream)

**设计目标：** 极低摩擦力的输入。像写代码一样写日记。

**A. UI 规范：**

- 常驻屏幕右侧，宽度 320px - 400px。
- **区域 1：Live Status (KPIs)**
  - 显示：硬止损线、本月盈亏。
  - **交互：** 点击数字可直接修改（持久化到 SystemConfig）。
- **区域 2：System Alert (反人性警报)**
  - 黄色边框警告区。
  - **用例：** 盘前输入“今日禁止追高”。盘中时刻可见。
- **区域 3：Stream Input (输入流)**
  - 一个巨大的 `textarea`，占据剩余空间。
  - 字体：`font-mono` (等宽字体)，类似 VS Code。

**B. 业务逻辑 (Use Cases)：**

- **[UC-07] 智能解析 (Smart Parsing):**

  - 用户输入纯文本，系统尝试解析。

  - **规则：**

    1. 第一行默认为 `title`。
    2. 如果行内包含 `pnl: +5000` 或 `盈亏: -200`，自动提取为 `pnl` 字段并标记类型为 `TRADE`。
    3. 如果行内包含 `#标签`，自动提取到 `tags` 数组。

  - **示例输入：**

    `[CODE BLOCK REMOVED BY USER]`

  - **解析结果：** Title="做多龙头失败", PnL=-3000, Type=TRADE, Tags=['打板', '炸板']。

- **[UC-08] 快捷键 (Shortcuts):**

  - `Ctrl + Enter`: 提交保存。
  - `Esc`: 清空/取消。

### 4.4 气闸视图：Buffer Zone (Side B)

**设计目标：** 心理状态的切换舱。这是独立的模块，通过侧边栏图标进入。

**A. 模块 1：Moral Breaker (道德除颤器)**

- **数据源：** 本地 JSON (`amoral_quotes.json`)，包含川普、利弗莫尔、曹操等人的实用主义语录。
- **交互：** 界面中央一个红色大按钮“BREAK MORAL”。点击后，屏幕闪烁（模拟电击视觉效果），随机弹出一句语录。

**B. 模块 2：Speech Gym (社交算法训练)**

- **数据源：** 本地 JSON (`social_scripts.json`)。
- **交互：** 抽卡模式。
  - **正面：** 场景描述（如“按摩师发表愚蠢观点”）。
  - **背面（点击翻转）：** 标准话术（“原来是这样”+冷漠脸）。
  - **操作：** 用户口述一遍，点击“下一个”。

------

## 5. UI/UX 视觉规范 (Design System)

AI 生成 CSS 时必须严格遵循此规范，确保 Cyberpunk / Professional Trader 风格。

### 5.1 调色板 (Tailwind Config)

不用默认颜色，需在 `index.css` 中重定义变量。

```
[CODE BLOCK REMOVED BY USER]
```

### 5.2 动效 (Animation)

- **Marquee (跑马灯):** 顶部系统咒语必须缓慢滚动。`animation: marquee 40s linear infinite`。
- **View Switch:** 视图切换时要有轻微的 `fade-in` 或 `slide-in`，模拟电子屏幕刷新。

------

## 6. 实现逻辑细节 (Implementation Logic)

### 6.1 状态管理 (TitanContext)

使用 React Context API。

```
[CODE BLOCK REMOVED BY USER]
```

### 6.2 存储策略 (Storage Strategy)

- **开发阶段：** 使用 `localStorage`。
- **生产阶段：** 预留 Firebase Hook 接口。
- **初始化：** App 启动时，检查 `localStorage` 是否有数据，如果没有，加载 `mockData.js` 作为演示。

## 7. 给 AI 代码生成模型的 Prompts (指令)

如果你使用 Cursor / GPT-4o 生成代码，请按顺序发送以下指令：

**指令 1：脚手架与基础**

> "创建一个 React + Vite 项目。配置 Tailwind CSS v4.0（使用 @import 语法）。创建上述的文件目录结构。设置 index.css 中的全局变量和暗黑模式样式。实现 src/core/models.js 中的数据定义。"

**指令 2：核心组件与布局**

> "实现 Sidebar, MappingPanel 和 App 的主布局。Sidebar 包含搜索框和导航图标。MappingPanel 需要包含 KPI 显示区、警报区和 Textarea 输入区。实现输入解析逻辑（识别第一行为标题，识别 #tag）。"

**指令 3：日历视图 (Terminal)**

> "集成 FullCalendar。实现 CalendarView 组件。根据 models.js 中的数据渲染事件。事件颜色必须遵循：pnl>0为红，pnl<0为绿。实现点击空白日期触发 MappingPanel 的补录模式。"

**指令 4：列表视图与搜索 (Omnisearch)**

> "实现 ListView 组件。使用 Fuse.js 对 records 进行模糊搜索。当 Context 中的 searchQuery 不为空时，App 组件应自动切换显示 ListView。列表项左侧需要有红/绿/蓝的竖条指示类型。"

**指令 5：Buffer Zone (B面)**

> "实现 BufferZone 独立页面（或模态框）。包含 'Moral Breaker' 功能，点击按钮随机显示一条冷血语录。包含 'Speech Gym' 功能，简单的卡片翻转效果。"