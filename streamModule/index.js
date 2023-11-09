
const http =require("http");
const fs = require("fs");

const server = http.createServer();

server.on("request", (req, res)=>{
    // fs.readFile("input.txt","utf-8",(err, data)=>{
    //     if(err) return console.log(err);
    //     res.end(data);  
        //2nd way
        //Reading from a stream
        //create a readable stream ( input.txt here)
        //handle stream events - data, end and error



        // const rstream= fs.createReadStream("input.txt")
        
        // rstream.on("data",(chunkdata)=>{
            //     res.write(chunkdata);
            // });
            // rstream.on("end",()=>{
                //     res.end();
                // })
        // rstream.on("error",(err)=>{
            //     console.log(err);
            //     res.end("file not found");
            // })

            // 3rd way
            const rstream= fs.createReadStream("input.txt")
            rstream.pipe(res)
        })
        // })
server.listen(8000, "127.0.0.1");