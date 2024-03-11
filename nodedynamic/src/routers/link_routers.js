const express = require("express");
const router = new express.Router();

//routing

router.get("/",(req,res)=>{
    res.render("index");
})

router.get("/contact",(req, res)=>{
    res.render("contact");
})

module.exports = router ;