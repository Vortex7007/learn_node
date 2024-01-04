const express = require("express");
require("./db/conn.js");
const Student = require("./models/students.js")
const app = express();
const studentRouter = require("./routers/students_routers.js");
const PORT=process.env.PORT || 3000

app.use(express.json());

// setting the express router


//3:
app.use(studentRouter);



app.listen(PORT,()=>{
    console.log (`connection is setup at ${PORT}`)
})