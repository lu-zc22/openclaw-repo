
const fs = require('fs');
const path = require('path');

// 读取模板和内容
const templatePath = path.join(__dirname, 'docs', 'ai-4g-headset-api', 'index.md');
const contentPath = path.join(__dirname, 'docs', 'ai-4g-headset-api', 'api-docs.html');
const outputPath = path.join(__dirname, 'docs', 'ai-4g-headset-api', 'index.html');

try {
    // 读取文件内容
    const template = fs.readFileSync(templatePath, 'utf8');
    const content = fs.readFileSync(contentPath, 'utf8');

    // 替换模板中的 {{content}} 占位符
    const html = template.replace('{{content}}', content);

    // 写入输出文件
    fs.writeFileSync(outputPath, html, 'utf8');

    console.log('HTML 文件生成成功:', outputPath);
} catch (error) {
    console.error('错误:', error);
}
