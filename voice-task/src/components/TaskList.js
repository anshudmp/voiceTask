import React, { useState,useEffect } from 'react';
import { AppBar, Toolbar, Box, IconButton, Card, CardContent, Typography, Collapse, styled } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
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

function TaskList() {
    const navigate = useNavigate();
    const location = useLocation();
    const projectId = location.state?.projectId;
    const projectTitle = location.state?.projectTitle;
    const [expandedStates, setExpandedStates] = useState({});
    const [tasks, setTasks] = useState([]);
    console.log("ProjectID:",projectId);
    console.log("Project Title",projectTitle);
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

    const handleExpandClick = (id) => {
        setExpandedStates(prevStates => ({
            ...prevStates,
            [id]: !prevStates[id]
        }));
    };


    const handleEditTask = (task) => {
        navigate('/edit-task', { state: { task } }); // Navigate to task edit page with task data
    };

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
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
            <div className="task-grid">
                <h2>Tasks for {projectTitle}</h2>
                <div>
                    {tasks.map((task, index) => (
                        <Card key={task._id} className="task-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px' }}>
                                <Typography variant="h6">{task.Title}</Typography>
                                <div>
                                    <IconButton aria-label="delete the task" onClick={() => handleDeleteTask(task.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton aria-label="edit" onClick={() => handleEditTask(task)}>
                                        <ModeIcon />
                                    </IconButton>
                                    <ExpandMore
                                        expand={expandedStates[task.id]}
                                        onClick={() => handleExpandClick(task.id)}
                                        aria-expanded={expandedStates[task.id]}
                                        aria-label="show more"
                                    >
                                        <ExpandMoreIcon />
                                    </ExpandMore>
                                </div>
                            </div>
                            <Collapse in={expandedStates[task.id]} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography paragraph>Description: {task.description}</Typography>
                                    <Typography paragraph>Technologies: {task.technologies}</Typography>
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
