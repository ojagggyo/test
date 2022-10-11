const a = require('./aaa');
const b = require('./bbb');

console.log('index.jsのモジュールの値');
console.log(module);

console.log('aaa.jsのモジュールの値');
console.log(module.children[0]);

console.log('aaa.jsのエクスポートの値');
console.log(module.children[0].exports);
