const fs = require("fs");
// const data=fs.readFileSync("text.txt","utf-8");
// console.log(data);
// console.log("checking which prints first");
const data = fs.readFile("text.txt","utf-8",(err,data)=>{
    if(err) throw err;
    console.log(data);
})
console.log("checking which prints first.");