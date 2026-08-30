// ===== 开源项目数据 =====
// 排序规则：pin（置顶）在前，其余按 date 倒序（新的在前）
// badge 卡片右上角徽章；zh/en 双语；img 相对站点根目录
const PROJECTS_DATA = [
    {
        id: 'build_a_product_agent',
        date: '2026-05-22',
        pin: true,
        badge: { zh: '置顶', en: 'PINNED' },
        stars: '100+',
        img: 'project/build_a_product_agent.jpg',
        imgPos: 'center',
        tags: ['LangChain', 'FastAPI', 'OpenAI'],
        links: [{ label: '🐙 GitHub', url: 'https://github.com/ADW-19/build_a_product_agent' }],
        zh: { title: 'Build a Product Agent', desc: '基于我的开发经验汇总的生产级AI Agent开发手册，现已在GitHub上开源，已超过<b>100+ stars</b>' },
        en: { title: 'Build a Product Agent', desc: 'A production-grade AI Agent development handbook based on my experience, now open-source on GitHub with <b>100+ stars</b>' }
    },
    {
        id: 'build_a_product_agent_skill',
        date: '2026-08-30',
        badge: { zh: '最新', en: 'NEW' },
        img: 'project/build_a_product_agent_skill.png',
        imgPos: 'top',
        tags: ['Claude Code', 'Skill', 'FastAPI', 'LangGraph'],
        links: [{ label: '🐙 GitHub', url: 'https://github.com/ADW-19/build_a_product_agent_skill' }],
        zh: { title: 'Build a Product Agent Skill', desc: '把《构建生产级 AI Agent》手册的生产级规范提炼成 Claude Code 技能，dev / review / docs 三种模式，让 AI 按手册标准写 Agent 后端' },
        en: { title: 'Build a Product Agent Skill', desc: 'Distills the production-grade conventions of the "Build a Product Agent" manual into a Claude Code skill — dev / review / docs modes, so AI writes agent backends to the manual\'s standard.' }
    },
    {
        id: 'llmpic',
        date: '2026-05-17',
        img: 'project/llmpic.png',
        imgPos: 'center',
        tags: ['React', 'Python', 'LLM', 'Matplotlib'],
        links: [
            { label: '📦 PyPI', url: 'https://pypi.org/project/llmpic/' },
            { label: '🐙 GitHub', url: 'https://github.com/ADW-19/llmpic' }
        ],
        zh: { title: 'LLMPIC Python SDK', desc: '解决公司数据中台绘图无法调用Agent的问题，封装Agent SDK，一句话就能出统计图' },
        en: { title: 'LLMPIC Python SDK', desc: 'Encapsulated Agent SDK to solve the issue of data platform charting unable to invoke AI agents — one sentence to generate statistical charts' }
    }
];
