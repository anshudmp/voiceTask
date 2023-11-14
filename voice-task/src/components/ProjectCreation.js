import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './ProjectCreation.css'; // Importing the CSS file
import axios from 'axios';
function ProjectCreation() {
  const location = useLocation();
  const editProjectData = location.state?.project;

  const [isEditMode, setIsEditMode] = useState(false);
  const [form, setForm] = useState({
    projectTitle: '',
    projectManager: '',
    technologies: '',
    startDate: '',
    endDate: '',
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (editProjectData) {
      setIsEditMode(true);
      setForm({
        projectTitle: editProjectData.title,
        projectManager: editProjectData.Manager,
        technologies: editProjectData.Technologies,
        startDate: editProjectData.startdate,
        endDate: editProjectData.enddate,
      });
    }
  }, [editProjectData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const projectData = {
      Title: form.projectTitle,
      Manager: form.projectManager,
      Technologies: form.technologies,
      startdate: form.startDate,
      enddate: form.endDate,
    };

    try {
      const response = isEditMode 
        ? await axios.put(`http://localhost:5000/projects/${editProjectData._id}`, projectData)
        : await axios.post('http://localhost:5000/projects', projectData);

      console.log(response.data);
      setShowSuccessMessage(true); // Show success message
      setTimeout(() => setShowSuccessMessage(false), 3000); // Hide after 3 seconds
    } catch (error) {
      console.error('Error submitting project:', error);
      // Handle errors, show error message to the user if necessary
    }
  };

  return (
    <Container maxWidth="sm" className="task-creation-container">
      <Box sx={{ marginTop: 4, marginBottom: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {isEditMode ? 'Edit Project' : 'Create New Project'}
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
            Project has been {isEditMode ? 'updated' : 'created'} successfully!
          </Alert>
        </Collapse>

        <form onSubmit={handleSubmit}>
        <TextField
            label="Project Title"
            variant="outlined"
            fullWidth
            margin="normal"
            name="projectTitle"
            value={form.projectTitle}
            onChange={handleChange}
          />
          <TextField
            label="Project Manager"
            variant="outlined"
            fullWidth
            margin="normal"
            name="projectManager"
            value={form.projectManager}
            onChange={handleChange}
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
            {isEditMode ? 'Update Project' : 'Create Project'}
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default ProjectCreation;
