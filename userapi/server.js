const http = require("http")
const fs = require("fs");
const server = http.createServer((req, res)=>{
    const jsondata=fs.readFileSync("data.json","utf-8")
    const objdata = JSON.parse(jsondata);
    if(req.url=="/"){
        res.end("Hello form the home side");
    }
    else if(req.url=="/apidata"){
        res.writeHead(200,{"Content-type":"application/json"});
            res.end(`${objdata[2].color}`);
        }
    else if(req.url=="/about"){
        res.end("Hello form the about side");
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