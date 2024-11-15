require('dotenv').config();
const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
require("./db/conn.js");
const Register = require("./models/register.js");
const admin_register = require("./models/admin_schema.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth.js")
const admin_auth = require("./middleware/admin_auth.js");
const { escape } = require('querystring');
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


//functions
function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

// console.log(makeid(5));

//routing

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

app.get("/logout", auth , async(req,res)=>{
    try {
        // console.log(req.anshu)
        req.user.tokens = req.user.tokens.filter((currElement)=>{
            return currElement.token != req.token
        })
        res.clearCookie("jwt");
        await req.user.save();
        res.render("login");
    } catch (error) {
        res.status(500).send(error)
    }
})
app.get("/logoutall", auth , async(req,res)=>{
    try {
        // console.log(req.anshu)
        req.user.tokens = [];
        res.clearCookie("jwt");
        await req.user.save();
        res.render("login");
    } catch (error) {
        res.status(500).send(error)
    }
})

app.get("/register", (req,res)=>{
    res.render("register")
})
app.get("/admin",admin_auth, async(req,res)=>{
    const items = await Register.find({});
    res.render("adminpage",{items});
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
                res.clearCookie("jwt");
                res.clearCookie("admin");
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
            await userLogin.save();
            // res.clearCookie("jwt");
            res.cookie("jwt",token ,{
                expires: new Date(Date.now() + 600000),
                httpOnly: true,
            });
            res.clearCookie("admin");
            res.render("index");
        }
        else{
            res.send("wrong passwords or email")
        }
    } catch (err) {
        res.status(400).send("wrong email");
    }
})

app.get("/register_admin",admin_auth,async(req , res)=>{
    try {
        res.render("register_admin");
    } catch (error) {
        
    }
})
app.post("/register_admin",async(req ,res)=>{
    try{
        const adminCookie = req.cookies.admin;
        const verifyAdmin = jwt.verify(adminCookie, process.env.SECRET_KEY_ADMIN);
        const admin = await admin_register.findOne({_id:verifyAdmin._id})
        // console.log(admin);
        if(admin.newsecuritykey==req.body.secretkey){
            const password = req.body.password;
            const cpassword = req.body.cpassword;

            if(password == cpassword){
                const registerAdmin = new admin_register({
                    name :req.body.fullname,
                    email :req.body.email,
                    phone :req.body.phone,
                    newsecuritykey:makeid(5),
                    adminsecuritykey :req.body.secretkey,
                    age :req.body.age,
                    gender :req.body.inlineRadioOptions,
                    password : password
                    })
                    
                    const token = await registerAdmin.generateAuthToken();
                    res.clearCookie("admin");
                    res.cookie("admin",token);
                    
                    const newRegistration = await registerAdmin.save();
                    
                    res.clearCookie("jwt");
                    res.status(201).redirect('/admin');
                }
            else{
                res.send("password are not matching")
            }
        }
        else{
            res.status(402).send("fake admin detected");
        }
    }catch(error){
        res.send(error);
    }
})

app.get("/admin_login",async(req , res)=>{
    try {
        res.render("admin_login");
    } catch (error) {
        
    }
})

//login admin
app.post("/admin_login",async (req , res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;
        console.log(email)
        console.log(password)
        const adminLogin = await admin_register.findOne({email:email});
        console.log(adminLogin.password)
        const passwordMatch = await bcrypt.compare(password , adminLogin.password);
        if(passwordMatch){
            const token = await adminLogin.generateAuthToken();
            await adminLogin.save();
            res.clearCookie("admin");
            res.cookie("admin",token ,{
                expires: new Date(Date.now() + 600000),
                httpOnly: true,
            });
            
            res.clearCookie("jwt");
            res.redirect('/admin');
        }
        else{
            res.send("wrong passwords or email")
        }
    } catch (err) {
        res.status(400).send("wrong email");
    }
})

//ban user
app.post("/ban",admin_auth,async(req , res)=>{
    const _id= req.body.ban;
    console.log(_id);    
    const check = await Register.findOne({_id});
    if(check.status){
        const user = await Register.updateOne({_id:_id},{status:false});
    }
    else{
        const user = await Register.updateOne({_id:_id},{status:true});
    }
    res.redirect('/admin');
})
app.listen(port , ()=>{
    console.log(`Server live at port no : ${port}`)
})