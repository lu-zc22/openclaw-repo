
const fs = require('fs');
const path = require('path');

// 读取 HTML 文件
const htmlPath = path.join(__dirname, 'docs', 'ai-4g-headset-api', 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// 生成目录的函数
function generateTableOfContents(html) {
    const headings = [];
    const regex = /<(h2|h3) id="([^"]+)">([^<]+)<\/\1>/g;
    let match;

    while ((match = regex.exec(html)) !== null) {
        const level = parseInt(match[1].replace('h', ''));
        const id = match[2];
        const text = match[3];
        headings.push({ level, id, text });
    }

    if (headings.length === 0) {
        return '';
    }

    let toc = '<div class="toc">\n';
    toc += '    <h3>文档目录</h3>\n';
    toc += '    <ul>\n';

    let currentLevel = 0;
    headings.forEach(heading => {
        const level = heading.level;
        
        if (level > currentLevel) {
            for (let i = currentLevel; i < level - 1; i++) {
                toc += '        <ul>\n';
            }
        } else if (level < currentLevel) {
            for (let i = level; i < currentLevel; i++) {
                toc += '        </ul>\n';
            }
        }

        toc += `        <li><a href="#${heading.id}">${heading.text}</a></li>\n`;
        currentLevel = level;
    });

    while (currentLevel > 1) {
        toc += '        </ul>\n';
        currentLevel--;
    }

    toc += '    </ul>\n';
    toc += '</div>\n';

    return toc;
}

// 生成目录
const toc = generateTableOfContents(html);

// 添加目录样式
const tocStyles = `
    /* 目录样式 */
    .toc {
        position: fixed;
        top: 20px;
        left: 20px;
        width: 250px;
        max-height: calc(100vh - 40px);
        overflow-y: auto;
        background-color: #f8f9fa;
        border-radius: 8px;
        padding: 15px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        font-size: 0.9rem;
    }

    .toc h3 {
        margin-top: 0;
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd;
        color: #2c3e50;
    }

    .toc ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .toc ul ul {
        padding-left: 20px;
    }

    .toc li {
        margin: 8px 0;
    }

    .toc a {
        color: #3498db;
        text-decoration: none;
        transition: color 0.2s;
    }

    .toc a:hover {
        color: #2980b9;
        text-decoration: underline;
    }

    /* 响应式设计 */
    @media (max-width: 1024px) {
        .toc {
            position: static;
            width: 100%;
            max-height: 300px;
            margin-bottom: 20px;
        }
    }
`;

// 将目录和样式添加到 HTML 中
html = html.replace('    <div class="container">', `    ${toc}\n    <div class="container">`);
html = html.replace('    /* 响应式设计 */', `    ${tocStyles}\n    /* 响应式设计 */`);

// 更新容器宽度以适应侧边栏
html = html.replace('.container {', '.container {\n        margin-left: 300px;');

// 处理小屏幕设备的容器宽度
html = html.replace('        .container {', '        .container {\n            margin-left: 0;');

// 保存修改后的 HTML 文件
fs.writeFileSync(htmlPath, html, 'utf8');

console.log('目录功能已成功添加！');
