const http = require("http")
const fs = require("fs")
const file = fs.readFileSync("home.html","utf-8")
const server = http.createServer((req, res)=>{
    if(req.url=="/"){
        res.end(file);
    }
    else{
        res.writeHead(404,{"Content-type":"text/html"});
        res.end("error 404 ")
    }
    console.log(req.url);
    
});
server.listen(8000, "127.0.0.1" , ()=>{
    console.log("listening to port 8000")
})