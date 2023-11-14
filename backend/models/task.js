    const mongoose = require('mongoose');

    const TaskSchema = mongoose.Schema({
        Title :{
            type:String,
            required:true
        },
        description :{
            type:String,
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

    module.exports = mongoose.model('Task',TaskSchema);