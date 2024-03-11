const mongoose = require("mongoose");

const mongourl = "mongodb://127.0.0.1:27017/dynamicwebsite";
mongoose.connect(mongourl)
.then(()=>{console.log("DB connection successful")})
.catch((err) =>{console.log(err)});