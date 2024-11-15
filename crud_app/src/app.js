const express = require('express');
require("./db/conn.js");
const mongoose = require("mongoose")
const app = express();
const hbs = require("hbs");
const path = require("path");
const port = process.env.PORT || 3000;


//setting paths
const viewspath = path.join(__dirname , "../templates/views")

//middlewares
app.set("view engine","hbs")
app.use(express.json())
app.set("views",viewspath);


//routing
app.get("/", (req , res)=>{
    res.render("index");
})

app.listen(port, ()=>{
    console.log(`server running at port ${port}`);
})