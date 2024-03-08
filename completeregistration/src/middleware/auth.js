const jwt = require("jsonwebtoken");
const Register = require("../models/register");

const auth = async(req , res , next) =>{
    try {
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);//we will get the user id in this variable 
        const user = await Register.findOne({_id:verifyUser._id})
        // console.log(`user who logged in is ${user}`);

        req.token= token;
        req.user = user;
         next();
    } catch (err) {
        res.status(404).send(err)
    }
}
module.exports = auth;