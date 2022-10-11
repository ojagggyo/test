const a = require('./aaa');
const b = require('./bbb');

console.log('\nindex.jsのモジュールの値');
console.log(module);

console.log('\naaa.jsのモジュールの値');
console.log(module.children[0]);

console.log('\naaa.jsのエクスポートの値');
console.log(module.children[0].exports);

