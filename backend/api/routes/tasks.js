const express = require('express')
const router = express.Router();
const Task = require('../../models/tasks');
const { Mongoose } = require('mongoose');

router.get('/',async (req,res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

//route POST api/tasks
//desc Register a Task
//access Public

router.post('/',
 async (req,res) => {
    try{
    const task = new Task({
        Title:req.body.Title,
        Manager: req.body.Manager,
        Description: req.body.Description,
        Technologies:req.body.Technologies,
        startdate:req.body.startdate,
        enddate:req.body.enddate
    })
    await task.save();
    res.status(200).send(task)
}catch(err){
    console.log(err.message);
    res.status(500).send('Server Error');
}

    
});

//route PUT api/tasks/:id
//desc  Update task
//access Public

router.put('/:id',async (req,res) => {
    const {Title,Manager,Description,Technologies,startdate,enddate } = req.body;
    const taskdata = {};
    if(Title) taskdata.Title = Title;
    if(Manager) taskdata.Manager = Manager;
    if(Description) taskdata.Description = Description;
    if(Technologies) taskdata.Technologies = Technologies; 
    if(startdate) taskdata.startdate = startdate;
    if(enddate) taskdata.enddate = enddate
    try {
        let taskd = await Task.findById(req.params.id);
        if(!taskd)
        return res.status(404).json({msg:'task not Found'});

        taskd = await Task.findByIdAndUpdate(req.params.id,{$set:taskdata},{new:true});
        res.json(taskd);
    } catch (err) {
        console.error(er.message);
        res.status(500).send('Server Error')
    }

});

//route DELETE api/tasks/:id
//desc  Delete task 
//access Public

router.delete('/:id',async (req,res) => {
    try {
        let taskdel = await Task.findById(req.params.id);
        if(!taskdel)
        return res.status(404).json({msg:'Task not Found'});
        await Task.findByIdAndRemove(req.params.id);
        res.send(200).json({msg: 'Task removed'});
    } catch (err) {
        console.error(er.message);
        res.status(500).send('Server Error')
    }
});

module.exports = router; 