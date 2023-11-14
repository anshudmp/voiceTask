const express = require('express')
const router = express.Router();
const Project = require('../../models/project');
const Task = require('../../models/task'); 
const { Mongoose } = require('mongoose');

router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().populate('tasks');
        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//route POST api/projects
//desc Register a Task
//access Public

router.post('/', async (req, res) => {
    try {
        const project = new Project({
            Title: req.body.Title,
            Manager: req.body.Manager,
            Technologies: req.body.Technologies,
            startdate: req.body.startdate,
            enddate: req.body.enddate,
            // tasks field is not included here as tasks are usually added later
        });
        await project.save();
        res.status(200).send(project);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});


//route PUT api/projects/:id
//desc  Update task
//access Public

router.put('/:id', async (req, res) => {
    const { Title, Manager, Technologies, startdate, enddate } = req.body;
    const projectData = {};
    if (Title) projectData.Title = Title;
    if (Manager) projectData.Manager = Manager;
    if (Technologies) projectData.Technologies = Technologies;
    if (startdate) projectData.startdate = startdate;
    if (enddate) projectData.enddate = enddate;

    try {
        let project = await Project.findById(req.params.id);
        if (!project)
            return res.status(404).json({ msg: 'Project not Found' });

        project = await Project.findByIdAndUpdate(req.params.id, { $set: projectData }, { new: true });
        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//route DELETE api/projects/:id
//desc  Delete task 
//access Public

router.delete('/:id', async (req, res) => {
    try {
        let project = await Project.findById(req.params.id);
        if (!project)
            return res.status(404).json({ msg: 'Project not Found' });

        await Project.findByIdAndRemove(req.params.id);
        res.status(200).json({ msg: 'Project removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});




module.exports = router; 