const jwt = require("jsonwebtoken");
const Register = require("../models/register");

const auth = async(req , res , next) =>{
    try {
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        console.log(verifyUser);
        next();
    } catch (err) {
        res.status(404).send(err)
    }
}
module.exports = auth;