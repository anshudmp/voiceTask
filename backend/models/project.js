const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProjectSchema = mongoose.Schema({
    Title :{
        type:String,
        required:true
    },
    Manager :{
        type:String,
        required:true,
        unique:false
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
    },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
});

module.exports = mongoose.model('projects',ProjectSchema);