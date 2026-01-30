### 1. Web 版的 Temperature 是多少？能改吗？

- **当前是多少**：Web 版（官方网页）的 Temperature 是**不可见且动态的**。通常默认在 **0.7 - 0.8** 左右（兼顾流畅度和创造性）。有时候它会根据你的 Prompt 自动微调。
- **如何设置**：
  - **Web 聊天界面**：**无法设置**。这是官方为了简化用户体验做的封装。
  - **唯一的“作弊”方法**：你可以尝试在 Prompt 里写 _"Please use temperature 0.1 logic, be extremely precise"_，但这只是给模型心理暗示（In-context learning），不是底层参数修改，效果不稳定。
  - **真正的方法**：如果你想精准控制（比如设为 0），必须使用 **Google AI Studio** (网页版 playground) 或者我们之前说的 **API**。只有在那里，你才是驾驶员，而在 Web 版你只是乘客。

### 1. RAG (Retrieval-Augmented Generation)

**结论**：RAG 是给 LLM "外挂大脑"，让它能查阅你私有的数据（聊天记录/交易日志）回答问题。

**核心原理**： LLM 本身是预训练的（Pre-trained），它的知识截止于训练日，且不知道你的私事。RAG 的流程是：

1. **检索 (Retrieval)**：用户提问 -> 系统去你的数据库里搜索最相关的片段（Context）。
2. **增强 (Augmented)**：系统把“用户问题 + 搜索到的片段”拼成一个 Prompt。
3. **生成 (Generation)**：LLM 根据提供的片段回答问题。

**简单实现 (Minimal Implementation)**： 对个人开发者，不需要复杂的 Vector DB (如 Pinecone)。

- **工具**：SQLite (利用 `sqlite-vss` 插件或简单的全文搜索 FTS5) + OpenAI/Gemini Embedding API。
- **流程**：
  1. 把你的 `archives.db` 里的聊天记录，按 500 字一段切分。
  2. 调用 API 算出每一段的向量（Embedding，一串数字），存入库。
  3. 提问时，算出问题的向量，计算距离（Cosine Similarity），找出最近的 3 段话。
  4. 扔给 LLM：“根据以下资料回答用户问题...”。

**对你的用处**：

- **聊天记录 (Chat History)**：**完美回忆 (Perfect Recall)**。
  - _场景_：你问“上个月我和 Claude 讨论 React 那个 Bug 怎么修的？”，RAG 会直接定位到那段代码，而不是让你翻 100 个文件。
- **短线交易 (Day Trading)**：**模式匹配 (Pattern Matching)**。
  - _场景_：你记录了每次交易的 setup（如“高开低走，量能萎缩”）。你问“过去一年类似这种开盘形态，后续走势如何？”，RAG 找出历史相似的那几天的笔记，告诉你胜率。
  - _前提_：你的交易记录必须是文本化或半结构化的（Structured）。

_(证据强度: 强 - RAG 是目前企业级 LLM 应用的标准架构)_

这是一个非常宏大且逻辑严密的架构升级。你正在从一个“静态档案查看器”进化为一个“动态外脑实验室”。

我将分点回答你的疑问，并提供最终的 **Grand Unification (大一统)** 代码方案。

---

### 1. 关于 RAG 的深度策略

- **旧文档留存**：**绝对保留，但冷处理**。
  - **文件夹命名建议**：`Archive_Vault` (档案馆) / `Deep_Storage` (深层存储) / `Legacy_Data` (遗产数据)。选 `Archive_Vault` 听起来最酷且专业。
  - **数据库 vs 文件**：RAG 必须用数据库（向量数据库）。
    - **目录层级**：这在数据库里就是一个字段 `metadata: { path: "/docs/trading/2023" }`。RAG 搜索时，你可以告诉它“只搜 `/trading` 目录下的”。结构不会丢失，只是变成了标签。
- **短线交易用途**：
  - 你的几条交易记录确实不够 RAG 用。
  - **爬虫策略是正解**：爬取论坛/新闻 -> 存入数据库 -> RAG 总结情绪。这比分析你自己的几条记录有价值得多。
- **数据库结构**：
  - 目前的结构（Session + Messages）对于 RAG 的**基础**是够用的。
  - 未来做 RAG 时，只需要新建一张表 `embeddings`，把 Message 的内容算成向量存进去，和 Message ID 关联即可。**现在不需要改结构**，以后是“外挂”上去的。
