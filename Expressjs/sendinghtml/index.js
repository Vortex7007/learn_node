const express = require("express")
const path = require("path")
const hbs = require("hbs")
const requests = require("requests")
const app = express()
const port =process.env.PORT || 8000;
const staticPath=path.join(__dirname,"/public")
const templatePath = path.join(__dirname,"/templates/views")
const partialsPath = path.join(__dirname,"/templates/partials")

app.set('view engine','hbs');//to set the view engine

//to set the VIEWS folder to a random folder 
app.set("views",templatePath)
hbs.registerPartials(partialsPath);
// console.log(path.join(__dirname,"/public"))

app.get('',(req,res)=>{
    res.render('index',{
        vortex : "Anshu kumar Mandal"
    })    
})
app.get("/about",(req,res)=>{
    requests(`https://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&appid=b742a35b48bcc06e9abb48a4a017e8e5`)
            .on('data', (chunk)=> {
                const objdata = JSON.parse(chunk)
                const array= [objdata]
                console.log(`${array[0].main.temp} ${array[0].name}`)
                res.write(array[0].name)
            })
            .on('end',(err)=>{
                if (err) return console.log('connection closed due to errors', err);
                res.end();

                console.log('end');
            });
})
app.get('/about/*',(req,res)=>{
    res.render('404',{
        errorcodexyz : "Oops this about us page not found"
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        errorcodexyz : "Oops page not found"
    })
})
// app.use(express.static(staticPath))
// app.get('/',(req,res)=>{
//     res.write("<h1>hello there</h1>")//use res.write for multi line response //use for sending html
//     res.send();//use to stop the response , if not used the page will load for a long time
// })
// app.get('/temp',(req,res)=>{
//     res.json([{//can also use json in place of send , json can also be used to send non objects like null and undefined while send can't do this
//         id:16,
//         name :"vortex7007",
//         payment : null
//     }])//way to send json data
// })



//this comment is added by the rahul



app.listen(port,()=>{
    console.log(`Listening to port no ${port}`)
})
