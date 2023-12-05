import React, { useState,useEffect ,useCallback,useRef} from 'react';
import { AppBar, Toolbar, Box, IconButton, Card, CardContent, Typography, Collapse, styled,Chip ,TextField,InputAdornment} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import axios from 'axios';
import './TaskList.css';
import useAlanAI from './useAlanAI';
import SearchIcon from '@mui/icons-material/Search';
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
    const projectId = location.state?.projectId;
    const projectTitle = location.state?.projectTitle;
    const [expandedStates, setExpandedStates] = useState({});
    const [tasks, setTasks] = useState([]);
    const tasksRef = useRef(tasks);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        tasksRef.current = tasks;
      }, [tasks]);
    console.log("ProjectID:",projectId);
    console.log("Project Title",projectTitle);
    const alanCommandsHandler = useCallback(async ({ command, title,searchTerm }) => {
        const currentTasks = tasksRef.current;
        switch (command) {
          case 'createTask':
            navigate('/create-task', { state: { projectTitle } });
            break;
          case 'editTask':
            const taskToEdit = currentTasks.find(task => task.Title.toLowerCase() === title.toLowerCase());
            console.log("taskto edit****",taskToEdit);
        if (taskToEdit) {
            console.log("tasklist",taskToEdit);
            console.log("*****Project Title",projectTitle);
            // Pass both the task and the project title to the edit task page
            navigate('/edit-task', { state: { task: taskToEdit, projectTitle } });
        }
            break;
            case 'searchTasks':
                setSearchTerm(searchTerm.toLowerCase());
                console.log("searchTerm",searchTerm)
                break;
          case 'deleteTask':
            const taskToDelete = currentTasks.find(task => task.Title.toLowerCase() === title.toLowerCase());

            if(taskToDelete){
                console.log("Delete",taskToDelete)
           
        }
        try {
           
            const response = await axios.delete(`http://localhost:5000/tasks/tasks?projectTitle=${encodeURIComponent(projectTitle)}&taskTitle=${encodeURIComponent(taskToDelete.Title)}`);
            // setTasks(tasks.filter(task => task.Title.lower() !== taskToDelete.Title.lower()));
            // Update the local state to reflect the deletion
             setTasks(prevTasks => prevTasks.filter(task => task.Title !== taskToDelete.Title));
    
            // console.log(response.data); // Log the server response
        } catch (err) {
            console.error('Error deleting task:', err);
            // Handle error appropriately (e.g., show an error message to the user)
        }

            break;
  
          case 'expandTask':
            console.log("tasks",tasks)
            const taskToExpand = currentTasks.find(task => task.Title.toLowerCase() === title.toLowerCase());
            if(taskToExpand){
            setExpandedStates(prevStates => ({
                ...prevStates,
                [taskToExpand.Title]: !prevStates[taskToExpand.Title]
            }));
        }
            break;
          default:
            // Other commands
            break;
        }
      }, [navigate, tasks,projectTitle]);
      
      useAlanAI(alanCommandsHandler);
    useEffect(() => {
        const fetchTasks = async () => {
            try {

                const response = await axios.get(`http://localhost:5000/tasks/tasks?title=${projectTitle}`);
                setTasks(response.data);
                console.log("Response",response.data);
            } catch (err) {
                console.error('Error fetching tasks:', err);
                // Handle error appropriately
            }
        };

        fetchTasks();
    }, [projectId]);

    const handleExpandClick = (title) => {
        console.log("Title",title)
        setExpandedStates(prevStates => ({
            ...prevStates,
            [title]: !prevStates[title]
        }));
    };
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
      };
    
      const filteredTasks = tasks.filter(task =>
        task.Title.toLowerCase().includes(searchTerm)
      );

    const handleEditTask = (task,projectTitle) => {
        console.log("~~~~~~~~~~~~~Project Title",projectTitle);
        navigate('/edit-task', { state: { projectTitle,task } }); // Navigate to task edit page with task data
    };

    const handleDeleteTask = async (task, projectTitle) => {
        try {
            // Send a DELETE request to the server
            // console.log("~~~~~~~~~~~~taskTitle",taskTitle);
            const tasktt = task.Title;
            console.log("$$$$$tasktt",tasktt)
            const response = await axios.delete(`http://localhost:5000/tasks/tasks?projectTitle=${encodeURIComponent(projectTitle)}&taskTitle=${encodeURIComponent(tasktt)}`);
    
            // Update the local state to reflect the deletion
            setTasks(prevTasks => prevTasks.filter(task => task.Title !== tasktt));
    
            console.log(response.data); // Log the server response
        } catch (err) {
            console.error('Error deleting task:', err);
            // Handle error appropriately (e.g., show an error message to the user)
        }
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
                        <TextField
      label="Search Tasks"
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
      <Chip label="Create a new task" variant="outlined" sx={{ m: 1, color: 'white', border: 'none', backgroundColor: 'secondary.main' }} />
      <Chip label="Edit task TaskTitle" variant="outlined" sx={{ m: 1, color: 'white', border: 'none', backgroundColor: 'secondary.main' }} />
      <Chip label="Delete task TaskTitle" variant="outlined" sx={{ m: 1, color: 'white', border: 'none', backgroundColor: 'secondary.main' }} />
     
      <Chip label="Expand task TaskTitle" variant="outlined" sx={{ m: 1, color: 'white', border: 'none', backgroundColor: 'secondary.main' }} />
      <Chip label="Search for tasks TaskTitle" variant="outlined" sx={{ m: 1, color: 'white', border: 'none', backgroundColor: 'secondary.main' }} />
     
    </Box>
            <div className="task-grid">
                <h2>Tasks for {projectTitle}</h2>
                <div>
                    {filteredTasks.map((task, index) => (
                        <Card key={task.id} className="task-card-list">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px' }}>
                                <Typography variant="h6">{task.Title}</Typography>
                                <div>
                                    <IconButton aria-label="delete the task" onClick={() => handleDeleteTask(task,projectTitle)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton aria-label="edit" onClick={() => handleEditTask(task,projectTitle)}>
                                        <ModeIcon />
                                    </IconButton>
                                    <ExpandMore
                                        expand={expandedStates[task.Title]}
                                        onClick={() => handleExpandClick(task.Title)}
                                        aria-expanded={expandedStates[task.Title]}
                                        aria-label="show more"
                                    >
                                        <ExpandMoreIcon />
                                    </ExpandMore>
                                </div>
                            </div>
                            <Collapse in={expandedStates[task.Title]} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography paragraph>Description: {task.description}</Typography>
                                    <Typography paragraph>Technologies: {task.Technologies}</Typography>
                                    <Typography paragraph>Start Date: {task.startdate.split("T")[0]}</Typography>
                                    <Typography paragraph>End Date: {task.enddate.split("T")[0]}</Typography>
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
