const mongoose = require('mongoose')
// hi
const usertenderSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenders',
        required: true
    },
    // current login user
    usertender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    file:{
        type:String,
        required:true
    },
    paid:{
        type:Boolean,
        default:false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    fileUrls: {
        type: [String],
        default: []
      },
    alloted:{
        type:String,
        default:"inprogress"
    },

})

// tenderSchema.index({ name: 'text', description: 'text' });
module.exports = mongoose.model('Usertender', usertenderSchema)