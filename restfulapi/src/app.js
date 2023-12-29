const express = require("express");
require("./db/conn.js");
const Student = require("./models/students.js")
const app = express();
const PORT=process.env.PORT || 3000

app.get("/",(req,res)=>{
    res.send("hello from the root folders");
})
app.use(express.json())

//create new student
// app.post("/students",(req, res) =>{
//     console.log(req.body);
//     const user = new Student(req.body)
//     user.save().then(()=>{
//         res.status(201).send(user);
//     }).catch((err)=>{
//         res.status(400).send(err);
//     })
// })

app.post ("/students",async (req,res)=>{
    try {
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);        
    } catch (err) {
        res.status(400).send(err)
    }
})

app.listen(PORT,()=>{
    console.log (`connection is setup at ${PORT}`)
})