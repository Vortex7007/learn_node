const http = require("http");
const fs = require("fs");
const requests = require("requests");

const homefile = fs.readFileSync("home.html","utf-8");

const replaceVal =(orgValue , realValue)=>{
    let temperature= orgValue.replace("{%currentTemp%}",(realValue.main.temp-274.15).toFixed(1))
    temperature= temperature.replace("{%minTemp%}",(realValue.main.temp_min-274.15).toFixed(1))
    temperature= temperature.replace("{%maxTemp%}",(realValue.main.temp_max-274.15).toFixed(1))
    temperature= temperature.replace("{%city%}",realValue.name)
    temperature= temperature.replace("{%country%}",realValue.sys.country)
    temperature= temperature.replace("{%tempStatus%}",realValue.weather[0].main)
    return temperature;
}

const server = http.createServer((req, res) => {
    if (req.url == '/') {
        requests('https://api.openweathermap.org/data/2.5/weather?q=dhanbad&appid=b742a35b48bcc06e9abb48a4a017e8e5')
            .on('data', (chunk)=> {
                const objdata = JSON.parse(chunk)
                const array= [objdata]
                const realtimedata= array
                    .map((val)=> replaceVal(homefile , val)).join("");
                res.write(realtimedata)
                // console.log(realtimedata)
                
            })
            .on('end',(err)=>{
                if (err) return console.log('connection closed due to errors', err);
                res.end();

                console.log('end');
            });
    }
    else{
        res.writeHead(404,{"Content-type":"text/html"});
        res.end("error 404 ")
    }
})
server.listen(8000,"127.0.0.1")