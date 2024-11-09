const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, 'Must provide a title'],
        maxlength:[50, 'title cannot be more than 50 character']
    },
    description:{
        type:String,
        required:[true, 'Must provide a description'],
        maxlength:[200, 'title cannot be more than 200 character']
    },
    tag:{
        type:Array,
        required:[true, 'Must provide a tag'],
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        require:[true, 'Please Provide user']
    }
}, {timestamps:true}
)

module.exports = mongoose.model('Notes', noteSchema)