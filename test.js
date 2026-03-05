// 测试文件
const project = require('./index');

console.log('🧪 开始测试项目...');

// 测试 greet 方法
const greetResult = project.greet('World');
console.log('✅ greet 方法:', greetResult);

// 测试 add 方法
const addResult = project.add(2, 3);
console.log('✅ add 方法:', addResult);

// 测试 subtract 方法
const subtractResult = project.subtract(5, 2);
console.log('✅ subtract 方法:', subtractResult);

console.log('🎉 所有测试通过!');