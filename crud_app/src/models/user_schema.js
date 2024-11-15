const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.Schema({
    name :{
        type : String,
        required : true,
        minLength : 3
    },
    email :{
        type : String,
        required: true,
        vaidate(value){
            if(validator(!isEmail(value))){
                throw new Error("invalid email")
            }
        }
    },
    age :{
        type: Number,
        required : true,
        
    }
})