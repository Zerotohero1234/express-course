class Transactions {
    transactions = []

    constructor() {
        this.transactions = [
        {
            type: 'income',
            category: 'salary',
            amount: 10000,
        },
        {
            type: 'expense',
            category: 'shopping',
            amount: -5000,
        },
    ];
    }

    getTransactions() {
        return this.transactions;
    }

    getTransaction(index){
        return this.transactions[index]
    }

    createTransaction(type,category,amount){
        const newTrasaction = {
            type,
            category,
            amount,
        }
        this.transactions.push(newTrasaction)
        return newTrasaction;
    }

    updateTransaction(index, transaction) {
        this.transactions[index] = transaction;
        return this.transactions[index];
    }

    deleteTransaction(deleteindex) {
        this.transactions = this.transactions.filter(
          (data, index) => index !== Number(deleteindex)  
        );
        return true;
    }

}

const TransactionsData = new Transactions()

module.exports = {
    TransactionsData
};
