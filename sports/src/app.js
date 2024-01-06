const express = require("express");
require("./db/conn.js");

const MensRanking = require("./models/mens.js")
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
const router = require("./routers/men.js");
app.use(router);




app.listen(port, ()=>{
    console.log(`connection is live at port no. ${port}`);
})