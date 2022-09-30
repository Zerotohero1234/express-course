const mongoose = require("mongoose");

const testdb = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true,
    },
    age:{
        type:Number
    },
    tel:Number
})

const dbtest = mongoose.model("Members",testdb)

module.exports = {dbtest}