const fs= require("fs")
// fs.writeFile("text.txt","starting the asynchronous nature",(err)=>{
//     if(err) throw err;
//     console.log("file created");
// })
// fs.appendFile("text.txt"," hello there , iam just checking the functions",(err)=>{
//     if(err) throw err;
//     console.log("file created");
// })
fs.readFile("text.txt","utf-8",(err,data)=>{
    if(err) throw err;
    console.log(data);
}) 