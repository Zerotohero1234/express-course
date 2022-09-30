const express = require("express")
const app = express()
const {testApiRoute} = require("./src/testapi")
const bodyParser = require("body-parser")
const mongoose = require("mongoose");

app.get("/",(req,res)=>{
    res.send("HI")
})


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use("/api",testApiRoute)

// catch when client input wrong information or url
app.all("*",(req,res)=>{
    res.send("not found 4040")
})


mongoose.connect('mongodb+srv://anouwath:power789@cluster0.fhcas.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').then(()=>{
    console.log("Connect success");
    const port = 5000;
    app.listen(port,()=>{
    console.log("PORT>>>>",port);
    })
}).catch((err)=>console.log(err));

