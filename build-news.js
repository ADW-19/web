// ===== 构建脚本：moments/*.md → news-data.js =====
// 用法：新增/修改 md 后运行  node build-news.js
// 无任何依赖；页面零 fetch，file:// 直接打开可用
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, 'moments');
const OUT = path.join(__dirname, 'news-data.js');

// ---------- md 解析 ----------
function parseMoment(filename, md) {
    const date = (filename.match(/^(\d{4}-\d{2}-\d{2})/) || [])[1] || '';
    const title = (md.match(/^#\s+(.+)$/m) || [])[1]
        || filename.replace(/^\d{4}-\d{2}-\d{2}-?/, '').replace(/\.md$/, '');
    const body = md.replace(/^#\s+.+\s*/, '');
    const excerpt = body
        .replace(/<[\s\S]*?>/g, '')
        .replace(/```[\s\S]*?```/g, '')
        .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
        .replace(/[#>*`\[\]()-]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 90);
    return { filename, date, title, body, excerpt };
}

// ---------- 极简 md → HTML（标题/段落/图片/代码块/链接/加粗/斜体/原生HTML） ----------
function mdToHtml(md) {
    const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const inline = s => esc(s)
        .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
        .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
        .replace(/`([^`]+)`/g, '<code>$1</code>');

    let html = '', inCode = false, inHtmlBlock = false, para = [], list = [];
    const flushPara = () => {
        if (para.length) {
            const text = para.join(' ').trim();
            // 单独成行的 *斜体* → 图注
            html += (text.startsWith('*') && text.endsWith('*') && !text.startsWith('**'))
                ? `<em>${inline(text.slice(1, -1))}</em>\n`
                : `<p>${inline(text)}</p>\n`;
            para = [];
        }
    };
    const flush = () => {
        if (list.length) {
            html += `<ul>${list.map(i => `<li>${inline(i)}</li>`).join('')}</ul>\n`;
            list = [];
        }
        flushPara();
    };

    for (const line of md.split('\n')) {
        if (line.trim().startsWith('```')) {
            flush();
            html += inCode ? '</code></pre>\n' : '<pre><code>';
            inCode = !inCode;
            continue;
        }
        if (inCode) { html += esc(line) + '\n'; continue; }

        // 原生 HTML 块（<video>、<!-- --> 等）：整块透传，直到空行
        if (!inHtmlBlock && /^\s*</.test(line)) {
            flush();
            inHtmlBlock = true;
        }
        if (inHtmlBlock) {
            html += line + '\n';
            if (line.trim() === '') inHtmlBlock = false;
            continue;
        }

        const h = line.match(/^(#{1,4})\s+(.*)/);
        if (h) {
            flush();
            const l = h[1].length;
            html += `<h${l}>${inline(h[2])}</h${l}>\n`;
            continue;
        }
        if (line.trim() === '') { flush(); continue; }

        // 无序列表（连续的 - 行）
        const li = line.match(/^\s*-\s+(.*)/);
        if (li) { flushPara(); list.push(li[1].trim()); continue; }

        // 独立成行的图片
        const imgOnly = line.trim().match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
        if (imgOnly) {
            flush();
            html += `<p class="img"><img src="${imgOnly[2]}" alt="${imgOnly[1]}"></p>\n`;
            continue;
        }

        para.push(line.trim());
    }
    flush();
    if (inCode) html += '</code></pre>\n';
    return html;
}

// ---------- 构建 ----------
const files = fs.readdirSync(DIR)
    .filter(f => f.endsWith('.md'))
    .sort()
    .reverse(); // 文件名前缀是日期，倒序 = 新的在前

const data = files.map(f => {
    const md = fs.readFileSync(path.join(DIR, f), 'utf8');
    const date = (f.match(/^(\d{4}-\d{2}-\d{2})/) || [])[1] || '';
    // <!-- EN --> 分隔：上半中文，下半英文；无分隔则中英共用
    const [zhMd, enMd] = md.split(/<!--\s*EN\s*-->/);
    const mk = part => {
        const m = parseMoment(f, part);
        return { title: m.title, excerpt: m.excerpt, html: mdToHtml(m.body) };
    };
    const zh = mk(zhMd);
    const en = enMd !== undefined ? mk(enMd) : zh;
    return { filename: f, date, zh, en };
});

fs.writeFileSync(OUT,
    '// 自动生成，勿手改 —— 来源 moments/*.md（<!-- EN --> 上中下英），修改后运行 node build-news.js\nconst NEWS_DATA = ' + JSON.stringify(data) + ';\n');

console.log(`OK: ${data.length} 篇动态 → news-data.js`);
data.forEach(d => console.log(`  ${d.date}  ${d.zh.title} / ${d.en.title}`));
