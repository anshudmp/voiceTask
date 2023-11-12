import React, { useState } from 'react';
import { AppBar, Toolbar, Box, IconButton, Card, CardContent, Typography, Collapse, styled } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

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
        {"id": "1", "title": "Task 1", "description": "Description 1", "technologies": "Tech 1, Tech 2", "startDate": "2023-06-01", "endDate": "2023-06-15"},
        {"id": "2", "title": "Task 2", "description": "Description 2", "technologies": "Tech 3, Tech 4", "startDate": "2023-07-01", "endDate": "2023-07-15"},
        // ... add more tasks as needed ...
    ]);

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
                        <Card key={task.id} className="task-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px' }}>
                                <Typography variant="h6">{task.title}</Typography>
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
