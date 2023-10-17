const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    Title :{
        type:String,
        required:true
    },
    Manager :{
        type:String,
        required:true,
        unique:true
    },
    Description :{
        type:String,
        required:true
    },
    Technologies:{
        type:String,
        required:true
    },
    startdate :{
        type:Date,
        default:Date.now
    },
    enddate:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('tasks',TaskSchema);