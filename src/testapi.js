const express = require("express")
const testApiRoute = express.Router()
const {referenceTs} = require("./testTransaction")
const {dbtest} = require("./model/testModule")

const catcherror = (req,res,next) => {
    console.log("METHOD: >>>",req.method);
    console.log("BODY: >>>",req.body);
    console.log("URL: >>>",req.url);
    next()
}



testApiRoute.use(catcherror)

testApiRoute.get("/allTran/", async (req,res)=>{
    const filter = req.query
    // const alltran = referenceTs.getTestTrans();
    const allTran = await dbtest.find(filter).exec();
    res.json({
        allTran
    })
})

testApiRoute.get("/findTran/:id",async (req,res)=>{
    const id = req.params.id
    const findTran = await dbtest.findById(id).exec();
    res.json({
        findTran
    })
})

testApiRoute.post("/createTran", async (req,res)=>{
    const newInfor = req.body
    // const createTran = referenceTs.createTran(newInfor.type , newInfor.category, newInfor.amount)
    const createTran = new dbtest(newInfor);
    await createTran.save()
    res.json({
        createTran
    })
})

testApiRoute.put("/updateTran/:index",async (req,res)=>{
    const index = req.params.index
    const newinfor = req.body
    const updateTran = await dbtest.updateOne({_id:index},newinfor).exec()
    res.json({
        updateTran
    })
})

testApiRoute.delete("/deleteTran/:index",async (req,res) =>{
    const index = req.params.index
    const deleteTran = await dbtest.deleteOne({_id:index})
    res.json({
        deleteTran
    })
})  

module.exports = {testApiRoute}