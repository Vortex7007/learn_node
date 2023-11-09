//the http.createServer()method includes request and rsponse parameters which is supplied by node.js
//the request object can be used to get information about the current http request 

//eg , url , request header , adn data.

//the response objext can be used to send a response  for a current http request.

//if the response from the http server is supposed to be displayed as html , you should include and http header with the correct content type:

const http = require("http")
const server = http.createServer((req, res)=>{
    if(req.url=="/"){
        res.end("Hello form the home side");
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