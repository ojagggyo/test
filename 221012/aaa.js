/*
//--------------------
//CommonJS
//--------------------
//関数
module.exports.funcA = function() {
  return 'module.exports.funcA !!!';
};

//オブジェクト
module.exports.person = {
  age: 30,
  name: 'Yasu',
  title: 'Leader'
}
*/

//--------------------
//ES6
//--------------------
function funcA() {
  return 'module.exports.funcA !!!';
}
function funcAA() {
  return 'module.exports.funcAA !!!';
}

const person = {
  age: 30,
  name: 'Yasu',
  title: 'Leader'
}

export { funcA, funcAA, person };
