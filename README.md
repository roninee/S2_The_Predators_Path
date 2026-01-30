

# System 2 Compute Mode

### 使用这个应用需要脑力思考,耗费很多能量,不建议经常使用,大脑不喜欢这样繁重的任务,会让你不开心。



**个人知识管理与认知增强系统**

本项目是一个集成了 **AI 辅助思考 (System 3)** 和 **深度英语习得 (English Profile)** 的全栈个人应用。它旨在通过外挂的数字大脑（LLM）扩展认知边界，并通过科学的词频体系与权威词典数据构建坚实的语言基础。

------

## 🛠 技术架构 (Tech Stack)

- **Frontend**: React 19, Vite, Tailwind CSS 4, Lucide React, React Router v7.
- **Backend**: Python FastAPI (Uvicorn).
- **Database**: SQLite (多库架构).
- **Dictionary Engine**: 基于 `mdict-utils` 解析的朗文当代英语词典 (LDOCE6).
- **LLM Provider**: Google Gemini API.

------

## 🗄️ 数据库架构详解 (Database Schema)

为了保证性能和数据的解耦，系统采用了 **多数据库 (Multi-DB)** 架构。所有的数据库文件均位于 `backend/data/` 目录下。

### 1. 核心词库表 (`words.db`)

> **用途**：存储标准的词频列表（NGSL, COCA等），这是学习的基础“地图”。

- **`ngsl`**:
  - `id`: 主键。
  - `lemma`: 单词原形 (e.g., "take")。
  - `rank`: NGSL 书面语排名 (核心)。
  - `rank_ngsl_spoken`: NGSL 口语排名。
  - `rank_coca_spoken`: COCA 真实语料库口语排名。
  - `definition`: 简明定义。
  - `is_known`: **状态标记** (0=生词, 1=已掌握)。这是你在前端列表筛选的基础。

### 2. 朗文词典库 (`LDOCE6.db`)

> **用途**：只读的静态字典数据，由 `.mdx` 文件转换而来。

- **`mdx`**:
  - `entry`: 单词索引。
  - `paraphrase`: 朗文词典的原始 HTML 内容 (包含定义、例句、搭配、发音链接)。

### 3. 用户学习数据 (`my_lexicon.db`) 🔥 *核心*

> **用途**：记录你的个性化学习轨迹和收藏的语料。

- **`my_words`** (词汇状态):
  - 记录你深入学习过的单词，包含 `status` (学习阶段) 和 `review_count` (复习次数)。
- **`my_contexts`** (语境收藏):
  - **这是“笔记”的核心**。当你从朗文词典中点击 `+` 号时，数据存入此表。
  - `type`: `'collocation'` (搭配) 或 `'sentence'` (例句)。
  - `content`: 原始内容。
  - `cloze_content`: **挖空后的内容** (e.g., "He made a ______ to quit.")，用于后续的填空复习。
  - `source`: 来源标记 (默认为 'longman')。

### 4. 聊天存档 (`archives.db`)

> **用途**：System 3 的对话历史。

- **`sessions`**: 会话列表 (Topic, Updated Time)。
- **`messages`**: 具体的对话内容。
  - `is_collapsed`: 支持折叠过长的 AI 回复。
  - `is_deleted`: 软删除标记。

### 5. 高亮存档 (`highlights.db`)

> **用途**：存储网页插件剪藏的高亮内容 (URL, Text, Title)。

------

## 📘 英语学习模块使用手册 (English Profile)

这是你为了将被动词汇转化为主动词汇而设计的核心模块。

### 核心理念

- **词频优先**: 基于 NGSL/COCA 科学排名，优先攻克最高频词汇。
- **语境为王**: 不背孤立的中文意思，而是通过朗文的 **Collocations (语块)** 和 **Sentences (例句)** 来掌握用法。
- **输入假说**: 大量接触高质量的输入 (Input)，并通过“挖空”进行提取练习。

### 功能与操作流程

#### 1. 词汇筛选 (The Filter)

- **进入页面**: 点击 Dashboard 的 "English Profile"。
- **切换词表**: 顶部的下拉菜单可以选择 `General (NGSL)`, `Real Spoken (COCA)` 等不同维度的词频表。
- **专注生词**: 点击顶部工具栏的 **"Focus: Unknown"**。系统会隐藏 `is_known=1` 的词，让你只关注还没背过的词。
- **批量标记**: 如果一页的词你都认识，点击 **"Mark Page Known"**，一键“消灭”它们，推进进度条。

#### 2. 深度学习 (Deep Dive)

- **查词**: 点击任意单词卡片，右侧滑出 **Word Detail Panel**。
- **朗文数据**: 面板会实时从 `LDOCE6.db` 读取并渲染精美的词典内容。
  - **Audio**: 点击喇叭图标播放美音/英音（资源来自本地解压的 `.mdd`）。
  - **Definitions**: 英文释义 + 中文释义。
  - **Essential Patterns**: 顶部紫色区域会自动提取并展示该词的 **高频搭配 (Collocations)**。这是朗文的精华。

#### 3. 语料萃取 (Extraction & Saving)

这是将“字典”变为“私人笔记”的关键一步：

- **收藏搭配**: 在紫色的搭配胶囊上，点击 `+` 号。
  - *效果*: 该搭配会被存入 `my_lexicon.db`。
- **收藏例句**: 在觉得很有代表性的例句旁，点击 `+` 号。
  - *效果*: 系统会自动生成一个 **Cloze (挖空)** 版本并保存。例如原句是 *Reference to the map*，保存后你复习时看到的是 *______ to the map*。

------

## 🧠 System 3 (AI Copilot) 使用指南

这是你的外挂大脑，用于处理复杂任务、编程辅助或思维推演。

- **Markdown 编辑器**: AI 的回复支持完全的 Markdown 渲染。点击回复右上角的 **Edit (铅笔)** 图标，可以进入源码编辑模式，修改 AI 的回复或记录笔记。
- **TOC (大纲导航)**: 屏幕右侧会自动根据 AI 回复中的 `H1-H4` 标题生成目录，方便在长对话中跳转。
- **多选与导出**:
  - 点击顶部的 **Select** 进入选择模式。
  - 选中多条消息后，点击 **Export** 可以将其导出为 JSON，方便备份或迁移。
- **折叠模式**: 对于不想看的大段代码或废话，点击消息左侧的箭头可以将其折叠。

------

## 🚀 启动与维护 (Setup & Run)

### 1. 启动后端 (Backend)

Bash

```
cd backend
# 激活虚拟环境 (推荐)
# source venv/bin/activate (Linux/Mac)
# venv\Scripts\activate (Windows)

# 启动服务 (Port: 5678)
python main.py
```

### 2. 启动前端 (Frontend)

Bash

```
cd frontend
npm run dev
# 访问 http://localhost:5173
```

### 3. 数据维护

如果你更新了朗文词典文件 (`.mdx` / `.mdd`)，需要重新运行转换工具：

1. **更新图片/发音资源**:

   Bash

   ```
   # 在项目根目录运行
   mdict -x "backend/data/LDOCE6.mdd" -d "frontend/public/longman_media"
   ```

2. **更新词典数据库**:

   Bash

   ```
   # 生成新的 SQLite DB
   mdict -x "backend/data/LDOCE6.mdx" --exdb
   # 确保生成的文件名为 LDOCE6.db 并位于 backend/data/ 中
   ```

------

> **Note to Self:**
>
> - 保持简单 (Stay simple)。
> - 不要过度设计数据库，当前的 schema 已经足够支撑中短期需求。
> - 英语学习的重点是 **Save Word Context**，而不是单纯地浏览字典。定期检查 `my_lexicon.db` 里的积累。
