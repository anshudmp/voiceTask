const express = require('express')
const router = express.Router();
const Task = require('../../models/task'); 
const Project = require('../../models/project');

router.post('/tasks', async (req, res) => {
    try {
        // Extract the project title and task data from the request body
        const projectTitle = req.query.title;
        const { taskData } = req.body;
        console.log("Project Title",projectTitle)
        // Find the project by its title
        const project = await Project.findOne({ Title: projectTitle });
        console.log("project",project);
        if (!project) {
            return res.status(404).send('Project not found');
        }
        console.log("check1");
        console.log("taskdata",taskData);
        // Create a new task
        const newTask = new Task({
            Title: req.body.Title,
            description: req.body.description,
            Technologies: req.body.Technologies,
            startdate: req.body.startdate,
            enddate: req.body.enddate
        });

        const savedTask = await newTask.save();

        // Add this task to the project's tasks array
        project.tasks.push(savedTask._id);
        await project.save();

        res.status(201).json(savedTask);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.put('/tasks', async (req, res) => {
    try {
        const projectTitle = req.query.title;
        const taskTitle = req.query.Title;

        // Find the project by its title
        const project = await Project.findOne({ Title: projectTitle }).populate('tasks');
        console.log("@@@@@@@Edit Project",project);
        if (!project) {
            return res.status(404).send('Project not found');
        }

        // Find the task by title
        const taskToUpdate = project.tasks.find(task => task.Title === taskTitle);
        if (!taskToUpdate) {
            return res.status(404).send('Task not found');
        }

        // Update the task
        const updatedTask = await Task.findByIdAndUpdate(taskToUpdate._id, req.body, { new: true });
        if (!updatedTask) {
            return res.status(404).send('Error updating task');
        }

        res.status(200).json(updatedTask);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



router.delete('/tasks', async (req, res) => {
    try {
        const projectTitle = req.query.projectTitle;
        const taskTitle = req.query.taskTitle;
        console.log("DELETE")

        // Find the project by its title
        const project = await Project.findOne({ Title: projectTitle }).populate('tasks');
        console.log("!!Project",project)
        if (!project) {
            return res.status(404).send('Project not found');
        }

        // Find the task by title
        const taskToDelete = project.tasks.find(task => task.Title === taskTitle);
        if (!taskToDelete) {
            return res.status(404).send('Task not found');
        }

        // Remove the task from the project
        await Project.findByIdAndUpdate(project._id, { $pull: { tasks: taskToDelete._id } });

        // Delete the task
        const deletedTask = await Task.findByIdAndRemove(taskToDelete._id);
        if (!deletedTask) {
            return res.status(404).send('Error deleting task');
        }

        res.status(200).json({ msg: 'Task removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.get('/tasks', async (req, res) => {
    try {
        const projectTitle = req.query.title;
        if (!projectTitle) {
            return res.status(400).send('Project title is required');
        }

        const project = await Project.findOne({ Title: projectTitle }).populate('tasks');
        
        if (!project) {
            return res.status(404).send('Project not found');
        }

        res.json(project.tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});




module.exports = router; 