const mongoose = require("mongoose");

const mongourl = "mongodb://127.0.0.1:27017/students_api";

mongoose.connect(mongourl)
.then( ()=>{console.log("connection successful")})
.catch((err) =>{console.log(err)});