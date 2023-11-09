const fs=require("fs")
const objec={
    name :"anshu",
    age : 20,
    class : "btech"
}
// fs.writeFile("jsonnew.json",JSON.stringify(objec),(err)=>{
//     if(err) throw err;
//     console.log("done")
// })
fs.readFile("jsonnew.json","utf-8",(err,data)=>{
    if(err) throw err;
    console.log(data)
    console.log(JSON.parse(data))
})

