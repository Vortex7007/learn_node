const path = require("path");

console.log(path.basename('A:\learn_nodejs\11_path_mod.js'))
console.log(path.extname('A:\learn_nodejs\11_path_mod.js'))
console.log(path.dirname('A:\learn_nodejs\11_path_mod.js'))
const value= path.parse("A:\learn_nodejs\11_path_mod.js")
console.log(value.name);
