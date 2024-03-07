const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Registration")
.then(()=>{
    console.log("Database connection successful");
}).catch((err)=>{
    console.log(`Database connection failed \n ${err}`)
})
