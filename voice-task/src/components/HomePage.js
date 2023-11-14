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
import alanBtn from '@alan-ai/alan-sdk-web';
import axios from 'axios';

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

  const handleDeleteClick = async (project) => {
    try {
      const response = await axios.delete(`http://localhost:5000/projects/${project._id}`);
      console.log(response.data);
      // Filter out the deleted project from the state
      setProjects(projects.filter(p => p._id !== project._id));
  } catch (error) {
      console.error('Error deleting project:', error);
      // Handle errors, show error message to the user if necessary
  }
  };
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
//   const handleEditClick = useCallback((project) => {
//     navigate('/edit', { state: { project } });
// }, [navigate]);

// const handleDeleteClick = useCallback((title) => {
//     setProjects(projects.filter(project => project.title !== title));
// }, [projects]);
useEffect(() => {
  axios.get('http://localhost:5000/projects')
    .then(response => {
      const formattedProjects = response.data.map(project => ({
        ...project,
        title: project.Title, // Converting 'Title' to 'title'
        Manager: project.Manager,
        Technologies: project.Technologies,
        startdate: project.startdate.split("T")[0],
        enddate: project.enddate.split("T")[0],
      }));
      setProjects(formattedProjects);
      setIsLoading(false);
    })
    .catch(err => {
      setError(err);
      setIsLoading(false);
    });
}, []);


useEffect(() => {

    if (!alanBtnInstance.current) {
      alanBtnInstance.current = alanBtn({
        key: '',
        onCommand: (commandData) => {
          switch (commandData.command) {
            case 'createProject':
              navigate('/create');
              break;
          case 'editProject':
            console.log(commandData.title)
            console.log("check",commandData.startdate)
              const projectToEdit = projects.find(project => project.title.toLowerCase() === commandData.title.toLowerCase());
              
              if (projectToEdit) {
                navigate('/edit', { state: { projectToEdit } });
              }
              break;
          case 'deleteProject':
              setProjects(prevProjects => prevProjects.filter(project => project.title.toLowerCase() !== commandData.title.toLowerCase()));
              break;
          case 'viewTasks':
              const projectToView = projects.find(project => project.title.toLowerCase() === commandData.title.toLowerCase());
              const projectIdView = projects.find(project => project._id.toLowerCase() === commandData._id.toLowerCase());
              if (projectToView ||projectIdView ) {
                  navigate('/tasks', { state: {projectId:projectIdView.projectId,projectTitle: projectToView.title } });
                console.log(commandData)
              }
              break;
              case 'searchProjects':
                setSearchTerm(commandData.searchTerm.toLowerCase());
                break;
          case 'expandProject':
            const projectToExpand = projects.find(project => project.title.toLowerCase() === commandData.title.toLowerCase());
            if (projectToExpand) {
              setExpandedStates(prevStates => ({
                ...prevStates,
                [projectToExpand.title]: !prevStates[projectToExpand.title]
            }));

            }
              break;
            default:
              // Handle other commands or add a default action
              break;
          }
        },
      });
    }
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
            <IconButton color="inherit" onClick={() => navigate('/')}>
              <HomeIcon />
            </IconButton>
            <IconButton color="inherit" onClick={() => navigate('/create')}>
              <AddCircleOutlineIcon />
            </IconButton>
            <TextField
              label="Search Projects"
              variant="outlined"
              size="small"
              onChange={handleSearchChange}
              sx={{ marginLeft: 2, width: '20%' }}
            />
          </Box>
        </Toolbar>
      </AppBar>
    
<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 2 }}>
  <Typography variant="subtitle1">You can say commands like:</Typography>
  <Chip label="Create Project" variant="outlined" sx={{ m: 1 }} />
  <Chip label="Edit Project" variant="outlined" sx={{ m: 1 }} />
  <Chip label="Delete Project" variant="outlined" sx={{ m: 1 }} />
  <Chip label="View Tasks" variant="outlined" sx={{ m: 1 }} />
  <Chip label="Expand Project" variant="outlined" sx={{ m: 1 }} />
  <Chip label="Search Project" variant="outlined" sx={{ m: 1 }} />
</Box>

      <div className="task-grid">
        <h2>Projects</h2>
        <div>
          {filteredProjects.map((project, index) => (
            <Card key={project.title + index} className="project-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px' }}>
                <Typography variant="h6">{project.title}</Typography>
                <div>
                  <IconButton aria-label="delete the project" onClick={() => handleDeleteClick(project)}>
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

