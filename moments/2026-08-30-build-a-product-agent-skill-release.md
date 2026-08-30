# Build a Product Agent Skill 正式发布：让 AI 按手册写生产级代码

读过《Build a Product Agent》手册的朋友都知道一个痛点——看过的规范，写代码时总会忘。

为此，我把整本手册提炼成了 AI 编程助手可调用的技能包——build_a_product_agent_skill，今日正式发布！

![Build a Product Agent Skill](project/build_a_product_agent_skill.png)
*build_a_product_agent_skill*

它让 AI 在每一次 Agent 后端相关的对话中，自动应用手册的生产级标准：

- 技术基线：Python 3.13+ / FastAPI / LangGraph
- 统一项目骨架：core/ 单例层 + routes/ + services/ + models/ + tools/
- 全异步铁律：redis.asyncio、AsyncOpenAI、拒绝阻塞调用
- 五大模块模式：对话 / 记忆 / 工具 / 工作流 / RAG

**🧩 三种模式**

- 🧑‍💻 dev：按手册基线与骨架写出完整可运行代码，错误写法与正确写法对照展示
- 🔍 review：八项清单审查现有代码——阻塞调用 / 配置硬编码 / 进程内状态 / 会话泄漏 / 无重试 / 技术栈漂移……
- 📖 docs：按手册「业界标准 → 为什么学校不教 → 你应该怎么写」的叙事风格撰写新章节

**🧠 越用越聪明**

内置记忆沉淀与代码库地图：你的纠正、项目踩坑与确认过的决策会记入 AGENT_MEMORY.md，随仓库走、跨工具可用；AGENT_MAP.md 让 AI 一发定位，不再全库乱翻。

**🔗 传送门**

- [GitHub：github.com/ADW-19/build_a_product_agent_skill](https://github.com/ADW-19/build_a_product_agent_skill)

支持 Claude Code / Codex / Qoder / Cursor / dsh。Claude Code 内两行命令安装：

```
/plugin marketplace add ADW-19/build_a_product_agent_skill
/plugin install build-a-product-agent-skill@build-a-product-agent-skill
```

如果对你有帮助，去 GitHub 点个 ⭐ 就是对我最大的鼓励！

<!-- EN -->

# Build a Product Agent Skill Released: AI That Codes to the Manual

Readers of the "Build a Product Agent" handbook know the pain — conventions you read are conventions you forget while coding.

So I distilled the entire manual into a skill pack that AI coding assistants can invoke — build_a_product_agent_skill, officially released today!

![Build a Product Agent Skill](project/build_a_product_agent_skill.png)
*build_a_product_agent_skill*

It makes AI apply the manual's production-grade standards in every conversation about agent backend work:

- Tech baseline: Python 3.13+ / FastAPI / LangGraph
- Unified project skeleton: core/ singleton layer + routes/ + services/ + models/ + tools/
- Async-everywhere rules: redis.asyncio, AsyncOpenAI, no blocking calls
- Five module patterns: chat / memory / tools / workflow / RAG

**🧩 Three Modes**

- 🧑‍💻 dev: complete runnable code on the manual's baseline & skeleton, wrong-vs-correct shown side by side
- 🔍 review: an 8-item checklist audit of existing code — blocking calls / hardcoded config / in-process state / session leaks / no retry / stack drift…
- 📖 docs: new chapters in the manual's signature "industry standard → why schools don't teach it → how you should code" narrative

**🧠 Gets Smarter Over Time**

Built-in memory deposition and a living codebase map: your corrections, project pitfalls and confirmed decisions are recorded into AGENT_MEMORY.md — plain text, git-trackable, surviving tool switches; AGENT_MAP.md lets the AI hit targets with one Read instead of scanning the whole repo.

**🔗 Links**

- [GitHub: github.com/ADW-19/build_a_product_agent_skill](https://github.com/ADW-19/build_a_product_agent_skill)

Works with Claude Code / Codex / Qoder / Cursor / dsh. Two commands to install in Claude Code:

```
/plugin marketplace add ADW-19/build_a_product_agent_skill
/plugin install build-a-product-agent-skill@build-a-product-agent-skill
```

If this helps you, a ⭐ on GitHub means the world to me!
