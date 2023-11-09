// const add = require("./12_create_mod");
// console.log(add(34,5));//for one  module

//second way
// const operator = require("./12_create_mod");
// console.log(operator.add(34,5));
// console.log(operator.sub(34,5));

//third way
const {add ,name, sub}=require("./12_create_mod");
console.log(add(34,5));
console.log(sub(34,5));
console.log(name)