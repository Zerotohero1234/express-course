const express = require("express")
const {TransactionsData} = require("./transaction")
const apiRouter = express.Router()
const {Transaction} = require("./model/transactionModel") 

const loggingMiddleware = (req,res,next) =>{
    console.log("Medthod : >>>",req.method);
    console.log("Url : >>>",req.url);
    console.log("Body : >>>",req.body);
    next();
};

const enhanceReq = (req,res,next) => {
    if(req?.body?.amount){
        req.userAmount = req?.body?.amount
    }
    next();
};

apiRouter.use(loggingMiddleware);
apiRouter.use(enhanceReq);

apiRouter.get("/transactions", async (req, res) => {
    // const transactions = TransactionsData.getTransactions()
    // res.json({
    //     transactions,
    // });
    console.log(req.userID);
    const filter = req.query
    const transaction = await Transaction.find(filter).exec();
    res.json({
        transaction,
    });
});

apiRouter.get("/transaction/:id", async (req,res)=>{
    const id = req.params.id
    // const transaction = TransactionsData.getTransaction(index)
    const transaction = await Transaction.findById(id).exec()
    res.json({
        transaction,
    })
})

apiRouter.post("/transaction", async (req,res)=>{
    const data = req.body;
    // const newTransaction = TransactionsData.createTransaction(data.type, data.category, data.amount);
    const newTransaction = new Transaction(data);
    await newTransaction.save();
    res.json({
        newTransaction
    })
})

apiRouter.put("/updateTransaction/:id",async (req,res)=>{
    const id = req.params.id
    const transaction = req.body;
    const updated = await Transaction.updateOne({_id:id},transaction).exec();
    // const updatedTransaction = TransactionsData.updateTransaction(index,data);
    
    
    res.json({
        updated
    })
})

apiRouter.delete("/deleteTransactionn/:id", async (req,res) => {
    const id = req.params.id
    // const deletedTransaction = TransactionsData.deleteTransaction(index);
    const deletedTransaction = await Transaction.deleteOne({_id:id})
    res.json({
        deletedTransaction
    })
})

apiRouter.get("/anouwath", (req, res) => {
    res.send("API ROUTER: Hi anouwath this is apiRouter")
});

module.exports = { apiRouter };

