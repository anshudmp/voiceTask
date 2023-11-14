import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Alert, IconButton, Collapse } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
function TaskCreation() {
    const navigate = useNavigate();
    const location = useLocation();
    const editTaskData = location.state?.task;

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
    
    useEffect(() => {
        if (editTaskData) {
            setIsEditMode(true);
            setForm({
                taskTitle: editTaskData.title,
                description: editTaskData.description,
                technologies: editTaskData.technologies,
                startDate: editTaskData.startDate,
                endDate: editTaskData.endDate,
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

        try {
            const response = await axios.post(`http://localhost:5000/tasks/tasks?title=${encodeURIComponent(projectTitle)}`, taskData);
            console.log(response.data);
            setShowSuccessMessage(true); // Show success message
            setTimeout(() => setShowSuccessMessage(false), 3000); // Hide after 3 seconds
        } catch (error) {
            console.error('Error creating task:', error);
            // Handle errors, show error message to the user if necessary
        }
    };

    return (
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
    );
}

export default TaskCreation;
