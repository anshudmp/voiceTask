import React, { useState, useEffect,useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Alert, IconButton, Collapse,AppBar,Toolbar,Chip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';import HomeIcon from '@mui/icons-material/Home';
import useAlanAI from './useAlanAI';
function TaskCreation() {
    const navigate = useNavigate();
    const location = useLocation();
    const editTaskData = location.state?.task;
    console.log("***edit task data",editTaskData)
    const [isEditMode, setIsEditMode] = useState(false);
    const [form, setForm] = useState({
        taskTitle: '',
        description: '',
        technologies: '',
        startDate: '',
        endDate: '',
    });
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    console.log("location",location.state);
    const projectTitle = location.state?.projectTitle;
    console.log("********project Title",projectTitle)
        const commandsHandler = useCallback(({ command }) => {
        if (command === 'homePage') {
          navigate('/');
        }
       
      }, [/* dependencies */]);
      const formatDate = (dateString) => {
        return dateString.split("T")[0];
      };
      useAlanAI(commandsHandler);
    useEffect(() => {
        console.log(editTaskData)
        if (editTaskData) {
            console.log("Edit Task Data",editTaskData);
            setIsEditMode(true);
            setForm({
                taskTitle: editTaskData.Title,
                description: editTaskData.description,
                technologies: editTaskData.Technologies,
                startDate: formatDate(editTaskData.startdate),
                endDate: formatDate(editTaskData.enddate),
            });
        }
    }, [editTaskData]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const taskData = {
            Title: form.taskTitle,
            description: form.description,
            Technologies: form.technologies,
            startdate: form.startDate,
            enddate: form.endDate
        };
        console.log("Title",form.taskTitle);
        console.log("project Title",projectTitle);
        try {
            let response;
            if (isEditMode) {
                // If in edit mode, make a PUT request to update the task
                console.log("task edit")
                console.log("project Title",projectTitle);
                response = await axios.put(`http://localhost:5000/tasks/tasks?title=${encodeURIComponent(projectTitle)}&Title=${encodeURIComponent(form.taskTitle)}`, taskData);
            } else {
                // If not in edit mode, make a POST request to create a new task
                response = await axios.post(`http://localhost:5000/tasks/tasks?title=${encodeURIComponent(projectTitle)}`, taskData);
            }
            console.log(response.data);
            setShowSuccessMessage(true); // Show success message
            setTimeout(() => setShowSuccessMessage(false), 3000); // Hide after 3 seconds
        } catch (error) {
            console.error('Error processing task:', error);
            // Handle errors, show error message to the user if necessary
        }
    };
    

    return (
        <>
         
        <AppBar position="static">
                <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1, color: 'white' }}>
      Voice Task
    </Typography>
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton color="inherit" onClick={() => navigate('/')}>
              <HomeIcon />
            </IconButton>
                        
                    </Box>
                </Toolbar>
            </AppBar>
            <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      my: 2,
      backgroundColor: 'primary.light', // Adding a light background color
      padding: '20px',
      borderRadius: '10px', // Rounded corners
      boxShadow: '0px 3px 5px rgba(0,0,0,0.2)', // Subtle shadow for depth
    }}>
      <Typography variant="subtitle1" style={{ fontWeight: 'bold', color: 'primary.contrastText' }}>
        You can say commands like:
      </Typography>
      <Chip label="Go to Home Page" variant="outlined" sx={{ m: 1, color: 'white', border: 'none', backgroundColor: 'secondary.main' }} />
     
    </Box>
        <Container maxWidth="sm">
            <Box sx={{ marginTop: 4, marginBottom: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {isEditMode ? 'Edit Task' : 'Create New Task'}
                </Typography>

                <Collapse in={showSuccessMessage}>
                    <Alert
                        severity="success"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => setShowSuccessMessage(false)}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                    >
                        Task has been {isEditMode ? 'updated' : 'created'} successfully!
                    </Alert>
                </Collapse>

                <form onSubmit={handleSubmit}>
                <TextField
                        label="Task Title"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="taskTitle"
                        value={form.taskTitle}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        multiline
                        rows={4}
                    />
                    <TextField
                        label="Technologies"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="technologies"
                        value={form.technologies}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Start Date"
                        variant="outlined"
                        type="date"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        name="startDate"
                        value={form.startDate}
                        onChange={handleChange}
                    />
                    <TextField
                        label="End Date"
                        variant="outlined"
                        type="date"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        name="endDate"
                        value={form.endDate}
                        onChange={handleChange}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: 2 }}
                    >
                        {isEditMode ? 'Update Task' : 'Create Task'}
                    </Button>
                </form>
            </Box>
        </Container>
        </>
    );
}

export default TaskCreation;
