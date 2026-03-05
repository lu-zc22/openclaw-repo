// openclaw-repo - 自动化测试项目
console.log('🚀 项目启动成功');
console.log('📦 项目名称:', 'openclaw-repo');
console.log('📄 描述:', 'OpenClaw自动化编程写系统，完成代码编程、运行测试、构建项目流程');

module.exports = {
  greet: function(name) {
    return `Hello, ${name}!`;
  },
  add: function(a, b) {
    return a + b;
  },
  subtract: function(a, b) {
    return a - b;
  }
};