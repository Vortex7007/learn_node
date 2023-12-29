const mongoose = require("mongoose");
const validator = require("validator");
const studentSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true,
        minlength:3,
        uppercase: true
    },
    email:{
            type:String,
            required:true,
            unique:[true,"Email already present"],
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("Invalid email")
                }
            }
    },
    phone:{
        type:Number,
        min:10,
        required:true
    },
    address:{
        type:String,
        required:true
    }
})

// new collection using modal
const Student =new mongoose.model('Student',studentSchema)

module.exports = Student;