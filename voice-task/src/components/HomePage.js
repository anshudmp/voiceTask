import React, { useState, useEffect, useRef ,useCallback} from 'react';
import './HomePage.css';
import { styled } from '@mui/material/styles';
import { Card, CardContent, Collapse, IconButton, Typography, AppBar, Toolbar, Box, TextField, Chip } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ListIcon from '@mui/icons-material/List';
import { useNavigate } from 'react-router-dom'; 

import { InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import useAlanAI from './useAlanAI';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));



function HomePage() {
  const [expandedStates, setExpandedStates] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const alanBtnInstance = useRef(null);

  const handleExpandClick = (title) => {
    setExpandedStates(prevStates => ({
      ...prevStates,
      [title]: !prevStates[title]
    }));
  };

  const handleEditClick = (project) => {

    navigate('/edit', { state: { project } });
  };

  const handleDeleteClick = (title) => {
    setProjects(projects.filter(project => project.title !== title));
  };
  const [projects, setProjects] = useState([
    {"title":"Project Alpha","Manager":"M1","Technologies":"T1, T2, T3","startdate":"2023-05-06","enddate":"2023-10-12"},
    {"title":"Project Beta","Manager":"M2","Technologies":"T4, T5, T6","startdate":"2023-06-10","enddate":"2023-11-15"},
    {"title":"Project C","Manager":"M3","Technologies":"T7, T8, T9","startdate":"2023-07-20","enddate":"2024-01-05"}
  ]);
//   const handleEditClick = useCallback((project) => {
//     navigate('/edit', { state: { project } });
// }, [navigate]);

// const handleDeleteClick = useCallback((title) => {
//     setProjects(projects.filter(project => project.title !== title));
// }, [projects]);

const alanCommandsHandler = useCallback(({ command, title, searchTerm }) => {
  switch (command) {
    case 'createProject':
      navigate('/create');
      break;
    case 'editProject':
      const project = projects.find(project => project.title.toLowerCase() === title.toLowerCase());
      if (project) {
        navigate('/edit', { state: { project } });
      }
      break;
    case 'deleteProject':
      setProjects(prevProjects => prevProjects.filter(project => project.title.toLowerCase() !== title.toLowerCase()));
      break;
    case 'viewTasks':
      const projectToView = projects.find(project => project.title.toLowerCase() === title.toLowerCase());
      if (projectToView) {
        navigate('/tasks', { state: { projectTitle: projectToView.title } });
      }
      break;
    case 'searchProjects':
      setSearchTerm(searchTerm.toLowerCase());
      break;
    case 'expandProject':
      const projectToExpand = projects.find(project => project.title.toLowerCase() === title.toLowerCase());
      if (projectToExpand) {
        setExpandedStates(prevStates => ({
          ...prevStates,
          [projectToExpand.title]: !prevStates[projectToExpand.title]
        }));
      }
      break;
    default:
      // Other commands
      break;
  }
}, [navigate, projects]);

useAlanAI(alanCommandsHandler);


  useEffect(() => {

  }, [navigate,projects ]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm)
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
           
            <IconButton color="inherit" onClick={() => navigate('/create')}>
              <AddCircleOutlineIcon />
            </IconButton>
            <TextField
      label="Search Projects"
      variant="outlined"
      size="small"
      onChange={handleSearchChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon style={{ color: 'white' }} />
          </InputAdornment>
        ),
        style: {
          color: 'white', // Text color
        },
      }}
      InputLabelProps={{
        style: { color: 'white' }, // Label color
      }}
      sx={{
        marginLeft: 2,
        width: '20%',
        backgroundColor: 'primary.main', // Background color
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'white', // Border color
            borderRadius: '15px',
          },
          '&:hover fieldset': {
            borderColor: 'white', // Hover border color
          },
          '&.Mui-focused fieldset': {
            borderColor: 'white', // Focus border color
          },
        },
      }}
    />
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
      <Chip label="Create a new project" variant="outlined" sx={{ m: 1, color: 'white', border: 'none', backgroundColor: 'secondary.main' }} />
      <Chip label="Edit project ProjectTitle" variant="outlined" sx={{ m: 1, color: 'white', border: 'none', backgroundColor: 'secondary.main' }} />
      <Chip label="Delete project ProjectTitle" variant="outlined" sx={{ m: 1, color: 'white', border: 'none', backgroundColor: 'secondary.main' }} />
      <Chip label="View Tasks for project ProjectTitle" variant="outlined" sx={{ m: 1, color: 'white', border: 'none', backgroundColor: 'secondary.main' }} />
      <Chip label="Expand Project ProjectTitle" variant="outlined" sx={{ m: 1, color: 'white', border: 'none', backgroundColor: 'secondary.main' }} />
      <Chip label="Search for projects ProjectTitle" variant="outlined" sx={{ m: 1, color: 'white', border: 'none', backgroundColor: 'secondary.main' }} />
    </Box>

      <div className="task-grid">
        <h2>Projects</h2>
        <div>
          {filteredProjects.map((project, index) => (
            <Card key={project.title + index} className="project-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px' }}>
                <Typography variant="h6">{project.title}</Typography>
                <div>
                  <IconButton aria-label="delete the project" onClick={() => handleDeleteClick(project.title)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton aria-label="edit" onClick={() => handleEditClick(project)}>
                    <ModeIcon />
                  </IconButton>
                  <IconButton aria-label="list tasks" onClick={() => navigate('/tasks', { state: { projectTitle: project.title } })}>
                    <ListIcon />
                  </IconButton>
                  <ExpandMore
                    expand={expandedStates[project.title]}
                    onClick={() => handleExpandClick(project.title)}
                    aria-expanded={expandedStates[project.title]}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </div>
              </div>
              <Collapse in={expandedStates[project.title]} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>Manager: {project.Manager}</Typography>
                  <Typography paragraph>Technologies: {project.Technologies}</Typography>
                  <Typography paragraph>Start Date: {project.startdate}</Typography>
                  <Typography paragraph>End Date: {project.enddate}</Typography>
                </CardContent>
              </Collapse>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

export default HomePage;

