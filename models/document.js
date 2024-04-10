const mongoose = require('mongoose')
const documentSchema = new mongoose.Schema({
    folderName:{
        type:String,
    },
    file: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('Document', documentSchema)
