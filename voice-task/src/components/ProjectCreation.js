import React, { useState, useEffect,useRef ,useCallback} from 'react';
import { useLocation } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Alert, Collapse, IconButton, AppBar, Toolbar ,Chip} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './ProjectCreation.css'; // Importing the CSS file
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom'; 
import useAlanAI from './useAlanAI';


function ProjectCreation() {
  const location = useLocation();
  const editProjectData = location.state?.project;
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);

  const [form, setForm] = useState({
    projectTitle: '',
    projectManager: '',
    technologies: '',
    startDate: '',
    endDate: '',
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commandsHandler = useCallback(({ command }) => {
    if (command === 'homePage') {
      navigate('/');
    }
    // ... other commands specific to ProjectCreation
  }, [/* dependencies */]);

  useAlanAI(commandsHandler);
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
    // Here, implement your API call for creating/updating the project
    // ...

    setShowSuccessMessage(true); // Show success message
    setTimeout(() => setShowSuccessMessage(false), 3000); // Hide after 3 seconds
  };

  return (
    <>
    <AppBar position="static">
    <Toolbar>
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
    <Container maxWidth="sm" className="task-creation-container">
      <Box sx={{ marginTop: 4, marginBottom: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {isEditMode ? 'Edit Project' : 'Create New Project'}
        </Typography>

        <Collapse in={showSuccessMessage}>
          <Alert className="alert"
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
            sx={{ mb: 1 }}
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
    </>
  );
}

export default ProjectCreation;
