const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    userId: {
        type: Number
    },
    accountId: {
		type: Number
	},
    type: {
        type: String
    },
    initialBallance: {
        type: Number
    },
    amount: {
        type: Number
    },
    categoryId: {
        type: Number
    }
})

module.exports = mongoose.model('transactions', TransactionSchema);