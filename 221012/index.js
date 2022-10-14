//--------------------
//CommonJS
//--------------------
const a = require('./aaa');
const b = require('./bbb');

console.log(a.funcA());
console.log(b.funcB());;

console.log(a.person);
console.log(b.person);


import { funcA, funcAA, person } from "./aaa";
console.log(funcA());
console.log(funcAA());
console.log(person);

/*
//--------------------
//ES6
//--------------------
import { funcA, funcAA, person } from "./aaa";
import { funcB } from "./bbb";

console.log(funcA());
console.log(funcAA());
console.log(funcB());

console.log(person);
*/
