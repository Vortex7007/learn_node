const express = require("express");
const Student = require("../models/students.js")
// 1:
const router = new express.Router();


// 2:

router.get("/",(req,res)=>{
    res.send("hello from the root folders");
})


//create new student
// router.post("/students",(req, res) =>{
//     console.log(req.body);
//     const user = new Student(req.body)
//     user.save().then(()=>{
//         res.status(201).send(user);
//     }).catch((err)=>{
//         res.status(400).send(err);
//     })
// })

router.post ("/students",async (req,res)=>{
    try {
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);        
    } catch (err) {
        res.status(400).send(err)
    }
})

//read the data of registered students
router.get("/students", async (req , res)=>{
    try {
        const studentsData= await Student.find();
        res.status(200).send(studentsData);
        console.log(studentsData)
    } catch (err) {
        res.status(404).send(err)
    }
})


//get individual student record
router.get("/students/:value", async (req , res)=>{
    try {
        const _id = req.params.value;
       const studentData = await Student.findById({_id});//if you want to use name then use find instead of findbyid and use name:_id to find that name 
       res.send(studentData);
    } catch (err) {
        
    }
})

//update students by id

router.patch("/students/:value", async (req , res)=>{
    try {
        const _id = req.params.value;
        const updateStudents = await Student.findByIdAndUpdate(_id,req.body,{
        //const updateStudents = await Student.updateOne({email : _id},req.body,{
            new: true
        });
        res.status(200).send(updateStudents);
    } catch (err) {
        res.status(404).send(err);
    }
})


//delete the students bu id
router.delete("/students/:value", async (req, res)=>{
    try {
        const _id = req.params.value;
        const deleteStudents= await Student.findByIdAndDelete(_id);
        res.send(deleteStudents);
    } catch (err) {
        res.status(404).send(err)
    }
})

module.exports = router ;