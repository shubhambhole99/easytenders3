const mongoose = require('mongoose')


const bankSchema = new mongoose.Schema({
    account_holder_name: {
        type: String,
        required: true
    },
    account_number: {
        type: String,
        required: true
    },
    bank_ifsc: {
        type: String,
        required: true
    },
    bank_name: {
        type: String,
        required: true
    },
    account_type: {
        type: String,
        required: true
    },
    bank_branch: {
        type: String,
        required: true
    },
    bank_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('Bank', bankSchema)