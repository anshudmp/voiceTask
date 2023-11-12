import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Alert, IconButton, Collapse } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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
        // Here, add your logic for creating or updating a task
        // For example, make an API call to save the task data

        setShowSuccessMessage(true); // Show success message
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
