const mongoose = require('mongoose')

const tenderSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    State: {
        type: String,
    },
    property_history: {
        type:String
    },
    scheme:{
        type:String
    },
    Emd: {
        type: Number,
        required: true,
        default: 0.0
    },
    description: {
        type: String,
        required: true,
    },
    tender_value: {
        type: String,
        default: 0
    },
    gross_area:{
        type:Number
    },
    doc: {
        type: String,
        ref: 'Document',
        required: true
    },
    ward: {
        type: String,
    },
    cts_number: {
        type: String,
    },
    // role: {
    //     type: String,
    //     required: true,
    //     enum: {
    //         values: [
    //             'user',
    //             'seller',
    //             'admin'
    //         ],
    //         message: '{VALUE} is not supported'
    //     }
    // },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
})

// tenderSchema.index({ name: 'text', description: 'text' });
module.exports = mongoose.model('Tenders', tenderSchema)