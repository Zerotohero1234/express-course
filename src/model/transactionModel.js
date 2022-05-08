const mongoose = require("mongoose"); // import mongoose

const transactionSchema = new mongoose.Schema({
    type: {
        type:String,
        required: true,
    },
    category:{
        type: String,
        default: "shopping",
    },
    amount:{
        type: Number,
    },
    date:{
        type: Date,
        default: new Date().toString(),
    }
});

const Transaction = mongoose.model("transaction",transactionSchema)

module.exports = {Transaction}