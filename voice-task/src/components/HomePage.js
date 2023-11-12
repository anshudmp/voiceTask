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
              if (projectToView) {
                  navigate('/tasks', { state: { projectTitle: projectToView.title } });
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

