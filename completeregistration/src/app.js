require('dotenv').config();
const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
require("./db/conn.js");
const Register = require("./models/register.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth.js")
const port = process.env.port || 3000

// console.log(process.env.SECRET_KEY)

const static_path  = path.join(__dirname,"../public");
const template_path  = path.join(__dirname,"../templates/views");
const partials_path  = path.join(__dirname,"../templates/partials");
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended:false}));

app.get("/",(req , res )=>{
    res.render("index");
})
app.get("/secret",auth ,(req , res )=>{
    console.log(`this is the value of the cookie ${req.cookies.jwt}`)
    res.render("secret");
})

app.get("/login", (req , res)=>{
    res.render("login")
})

app.get("/logout", auth , (req,res)=>{
    try {
        console.log("logout successfully")
    } catch (error) {
        res.status(500).send(error)
    }
})

app.get("/register", (req,res)=>{
    res.render("register")
})

//create a new user in our database
app.post("/register", async(req , res)=>{
    try {
        const password = req.body.password;
        const cpassword = req.body.cpassword;

        if(password == cpassword){
            const registerEmployee = new Register({
                name :req.body.fullname,
                email :req.body.email,
                phone :req.body.phone,
                age :req.body.age,
                gender :req.body.inlineRadioOptions,
                password : password
                })

                const token = await registerEmployee.generateAuthToken();
                res.cookie("jwt",token);

                const newRegistration = await registerEmployee.save();
                res.status(201).render("index");
                // console.log(newRegistration);
            }
        else{
            res.send("password are not matching")
        }
    } catch (err) {
        res.status(400).send(err);        
    }
})

//login user
app.post("/login",async (req , res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;
        console.log(email)
        console.log(password)
        const userLogin = await Register.findOne({email:email});
        const passwordMatch = await bcrypt.compare(password , userLogin.password);
        if(passwordMatch){
            const token = await userLogin.generateAuthToken();
            res.cookie("jwt",token ,{
                expires: new Date(Date.now() + 60000),
                httpOnly: true,
            });
            res.render("index");
        }
        else{
            res.send("wrong passwords or email")
        }
    } catch (err) {
        res.status(400).send("wrong email");
    }
})

app.listen(port , ()=>{
    console.log(`Server live at port no : ${port}`)
})