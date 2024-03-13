const express = require("express");
const User = require("../models/userschema");
const router = new express.Router();
//routing

router.get("/",(req,res)=>{
    res.render("index");
})

router.get("/contact",(req, res)=>{
    res.render("contact");
})

router.post("/contact",async(req, res)=>{
    try {
        const costumer = new User(req.body);
        const createUser = await costumer.save();
        res.status(201).render("index"); 
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router ;