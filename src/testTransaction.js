class testTransaction{
    constructor(){
        this.testTran = [
            {
                type:"income",
                category:"saraly",
                amount:7000000
            },
            {
                type:"expense",
                category:"shopping",
                amount:150000
            },
        ];
    }

    getTestTrans(){
        return this.testTran
    }

    getTestTran(index){
        return this.testTran[index]
    }

    createTran(type,category,amount){
        const getnew = {
            type,
            category,
            amount
        }
        this.testTran.push(getnew)
        return getnew
    }

    updateTran(index,newdata){
        this.testTran[index] = newdata
        return this.testTran[index]
    }

    delete(index){
        this.testTran = this.testTran.filter((data,ele)=>
            ele !== Number(index)
        );
        return true
    }

}


const referenceTs = new testTransaction()

module.exports = { referenceTs }