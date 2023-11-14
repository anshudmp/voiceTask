import React, { useState ,useCallback} from 'react';
import { AppBar, Toolbar, Box, IconButton, Card, CardContent, Typography, Collapse, styled,Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import './TaskList.css';
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

function TaskList() {
    const navigate = useNavigate();
    const location = useLocation();
    const projectTitle = location.state?.projectTitle;

    const [expandedStates, setExpandedStates] = useState({});
    const [tasks, setTasks] = useState([
        // Dummy tasks data
        {"title": "Task 1", "description": "Description 1", "technologies": "Tech 1, Tech 2", "startDate": "2023-06-01", "endDate": "2023-06-15"},
        {"title": "Task 2", "description": "Description 2", "technologies": "Tech 3, Tech 4", "startDate": "2023-07-01", "endDate": "2023-07-15"},
        // ... add more tasks as needed ...
    ]);
    const alanCommandsHandler = useCallback(({ command, title }) => {
        switch (command) {
          case 'createTask':
            navigate('/create-task', { state: { projectTitle } });
            break;
          case 'editTask':
            const task = tasks.find(task => task.title.toLowerCase() === title.toLowerCase());
            if (task) {
                console.log(task)
                navigate('/edit-task', { state: { task } });
               
            }
            break;
          case 'deleteTask':
            const taskToDelete = tasks.find(task => task.title.toLowerCase() === title.toLowerCase());
            if(taskToDelete){
                console.log(taskToDelete)
            setTasks(tasks.filter(task => task.title !== taskToDelete.title));
        }

            break;
  
          case 'expandTask':
            const taskToExpand = tasks.find(task => task.title.toLowerCase() === title.toLowerCase());
            setExpandedStates(prevStates => ({
                ...prevStates,
                [taskToExpand.title]: !prevStates[taskToExpand.title]
            }));
          
            break;
          default:
            // Other commands
            break;
        }
      }, [navigate, tasks,projectTitle]);
      
      useAlanAI(alanCommandsHandler);
    const handleExpandClick = (title) => {
        setExpandedStates(prevStates => ({
            ...prevStates,
            [title]: !prevStates[title]
        }));
    };


    const handleEditTask = (task) => {
        navigate('/edit-task', { state: { task } }); // Navigate to task edit page with task data
    };

    const handleDeleteTask = (title) => {
        setTasks(tasks.filter(task => task.title !== title));
    };

    const handleCreateTask = () => {
        navigate('/create-task', { state: { projectTitle } });
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton color="inherit" onClick={() => navigate('/')}>
              <HomeIcon />
            </IconButton>
                        <IconButton color="inherit" onClick={handleCreateTask}>
                            <AddCircleOutlineIcon />
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
      <Chip label="Create a new task" variant="outlined" sx={{ m: 1, color: 'white', border: 'none', backgroundColor: 'secondary.main' }} />
      <Chip label="Edit task TaskTitle" variant="outlined" sx={{ m: 1, color: 'white', border: 'none', backgroundColor: 'secondary.main' }} />
      <Chip label="Delete task TaskTitle" variant="outlined" sx={{ m: 1, color: 'white', border: 'none', backgroundColor: 'secondary.main' }} />
     
      <Chip label="Expand task TaskTitle" variant="outlined" sx={{ m: 1, color: 'white', border: 'none', backgroundColor: 'secondary.main' }} />
     
    </Box>
            <div className="task-grid">
                <h2>Tasks for {projectTitle}</h2>
                <div>
                    {tasks.map((task, index) => (
                        <Card key={task.id} className="task-card-list">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px' }}>
                                <Typography variant="h6">{task.title}</Typography>
                                <div>
                                    <IconButton aria-label="delete the task" onClick={() => handleDeleteTask(task.title)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton aria-label="edit" onClick={() => handleEditTask(task)}>
                                        <ModeIcon />
                                    </IconButton>
                                    <ExpandMore
                                        expand={expandedStates[task.title]}
                                        onClick={() => handleExpandClick(task.title)}
                                        aria-expanded={expandedStates[task.title]}
                                        aria-label="show more"
                                    >
                                        <ExpandMoreIcon />
                                    </ExpandMore>
                                </div>
                            </div>
                            <Collapse in={expandedStates[task.title]} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography paragraph>Description: {task.description}</Typography>
                                    <Typography paragraph>Technologies: {task.technologies}</Typography>
                                    <Typography paragraph>Start Date: {task.startDate}</Typography>
                                    <Typography paragraph>End Date: {task.endDate}</Typography>
                                </CardContent>
                            </Collapse>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}

export default TaskList;
