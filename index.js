const express = require('express') // import express
const bodyParser = require("body-parser") // import body-parser
const app = express(); // set app hai me kha pen express()
const mongoose = require("mongoose") // import mongoose phuea ma shai db mongodb
const {apiRouter} = require('./src/api'); // import apiRouter
const { userRouter } = require('./src/userRoute');
const {User} = require("./src/model/userModel")
const jwt = require("jsonwebtoken")
const cors = require("cors")



// basic Route
app.get("/", (req, res) => {
    console.log("Hi this text from /");
    res.send("hello world start express");
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

const protect = async (req,res,next) => {
    const headerToken = req.headers["authorization"]
    if(!headerToken){
        res.status(403).send("Not Auth")
        return;
    }
    const token = headerToken.split(" ")[1];
    console.log(token);
    if(!token){
        res.status(403).send("Not Auth");
        return;
    }
    const data = jwt.decode(token) // ການແງະໄອດີມາຈາກ token
    console.log("data=>",data);
    const user = await User.findById(data.userID)
    if(!user){
        res.status(403).send("User not found")
    }
    req.userID = user._id
    next();
}

// use api Router
app.use("/api", protect ,apiRouter) // ແມ່ນການນຳ apiRouter ມາໃຊ້ໃນ application express
app.use("/user",userRouter)

app.all("*",(req,res)=>{ // ແມ່ນການດັກຈັບເວລາ user ພິມ Route ຜິດ
    res.send("404 not found")
})

// start app
const port = process.env.PORT || 8080;

mongoose.connect('mongodb+srv://anouwath:power789@cluster0.fhcas.mongodb.net/mern-course?retryWrites=true&w=majority').then(()=>{ // import db
    console.log("Connect mongodb success");
    // const port = 4000;
    

    app.listen(port ,() => {
        console.log("Run server on port:", port);
    });
    }).catch(()=>{
        console.log("Connect mongodb error");
    })