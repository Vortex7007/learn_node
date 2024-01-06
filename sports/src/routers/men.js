const express = require("express");
const router = new express.Router();
const MensRanking = require("../models/mens.js")

router.get("/",(req , res)=>{
    res.send("Hello from the other side");
})

//handling post requests

router.post("/mens",async (req , res)=>{
    try {
       const addingMensRecords = new MensRanking(req.body);
       const createUser = await addingMensRecords.save();
       res.status(200).send(createUser);
    } catch (err) {
        res.status(500).send(err);
    }
})

//handle get request
router.get("/mens",async (req , res)=>{
    try {
       const getMens = await MensRanking.find().sort({"ranking" : 1});
       res.status(200).send(getMens);
    } catch (err) {
        res.status(400).send(err);
    }
})

//handle request for specific id 

router.get("/mens/:value",async (req , res)=>{
    try {
        const _id = req.params.value;
       const getMen = await MensRanking.findById({_id});
       res.status(200).send(getMen);
    } catch (err) {
        res.status(400).send(err);
    }
})

//update user

router.patch("/mens/:value",async (req , res)=>{
    try {
        const _id = req.params.value;
       const updateMen = await MensRanking.findByIdAndUpdate(_id,req.body,{
        new : true
        });
       res.status(200).send(updateMen);
    } catch (err) {
        res.status(400).send(err);
    }
})


//delete men

router.delete("/mens/:value",async (req , res)=>{
    try {
        const _id = req.params.value;
       const deleteMen = await MensRanking.findByIdAndDelete(_id);
       res.status(200).send(deleteMen);
    } catch (err) {
        res.status(400).send(err);
    }
})

module.exports = router;