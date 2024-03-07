const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const employeSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true,
        unique : true
    },
    phone :{
        type : Number,
        required : true,
        unique : true
    },
    age : {
        type : Number,
        required : true
    },
    gender :{
        type : String,
        required : true
    },
    password :{
        type : String,
        required : true
    },
    tokens:[{
        token:{
            type: String,
            required : true
        }
    }]
})

//creating tokens
employeSchema.methods.generateAuthToken = async function(){
    try {
        console.log(this._id)
        const token = await jwt.sign({_id : this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token})
        await this.save();
        console.log(token);
        return token;
    } catch (error) {
        res.send("the error part"+ error);
        console.log("the error part"+ error);
    }
}


//password hashing
employeSchema.pre("save", async function(next){
    if(this.isModified("password")){
        // console.log(`the current password is ${this.password}`);
        this.password = await bcrypt.hash(this.password , 10);
        // console.log(`the current password is ${this.password}`);
    }
    next();
})

const Register = new mongoose.model("Register",employeSchema);

module.exports = Register;