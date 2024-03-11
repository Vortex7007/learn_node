const express = require("express");
require("./db/conn")
const linkRouter = require("./routers/link_routers.js");
const path = require("path");
const hbs = require("hbs");
const app = express();
const port = process.env.PORT || 3000;


//setting the paths
const viewsPath = path.join(__dirname,"../templates/views")
const partialPath = path.join(__dirname,"../templates/partials")

//middlewares
app.set("view engine" , "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);


//routing
app.use(linkRouter);



//server create
app.listen(port, ()=>{
    console.log(`server running at port no ${port}`);
})