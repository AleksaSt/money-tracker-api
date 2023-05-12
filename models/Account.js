const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    balance: {
        type: Number
    },
    userId: {
        type: BigInt
    }
})

module.exports = mongoose.model('accounts', AccountSchema);