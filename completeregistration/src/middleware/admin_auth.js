const jwt = require("jsonwebtoken");
const admin_register = require("../models/admin_schema.js");

const admin_auth = async(req , res , next) =>{
    try {
        const token = req.cookies.admin;

        const verifyUser = jwt.verify(token, process.env.SECRET_KEY_ADMIN);//we will get the user id in this variable 
        const user = await admin_register.findOne({_id:verifyUser._id})
        // console.log(`user who logged in is ${user}`);

        req.token= token;
        req.user = user;
         next();
    } catch (err) {
        res.status(404).send(err)
    }
}
module.exports = admin_auth;