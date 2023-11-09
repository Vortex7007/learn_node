const fs =require("fs");
// fs.mkdir("thapa",(err)=>{
//     console.log("new folder created");
// })
// fs.writeFile("thapa/bio.txt","this is my first entry in the file",(err)=>{
//     if(err) throw err;
//     console.log("new file created");
// })
// fs.appendFile("thapa/bio.txt"," this is my second entry in the file",(err)=>{
//     if(err) throw err;
//     console.log("new text created");
// })
// fs.readFile("thapa/bio.txt","utf-8",(err,data)=>{
//     if(err) throw err;
//     console.log(data);
// })
// console.log("hey there")
// fs.rename("thapa/bio.txt","thapa/mybio.txt",(err)=>{
//     if(err) throw err;
//     console.log("rename successful");
// })
// fs.unlink("thapa/mybio.txt",(err)=>{
//     if(err) throw err;
//     console.log("file deleted successfully");
// })
fs.rmdir("thapa",(err)=>{
    if(err) throw err;
    console.log("folder deleted successfully");
})