/*
//--------------------
//CommonJS
//--------------------
//関数
export function funcB() {
  return 'module.exports.funcB !!!';
}
//オブジェクト
module.exports.person = {
  age: 40,
  name: 'Steemit',
  title: 'Manager'
}
*/

//--------------------
//ES6
//--------------------
function funcB() {
  return 'module.exports.funcB !!!';
}
function funcBB() {
  return 'module.exports.funcBB !!!';
}

const person = {
  age: 30,
  name: 'Yasu',
  title: 'Leader'
}

export { funcB, funcBB, person };
