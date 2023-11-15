import React, { useState } from 'react';
import HomePage from './components/HomePage';
import ProjectCreation from './components/ProjectCreation';
import TaskList from './components/TaskList';
import TaskCreation from './components/TaskCreation';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Link,Routes } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(59, 32, 94)', 
      light:'rgb(229 214 249)'
    },
    
  },
 
});
function App() {
  return (
    <ThemeProvider theme={theme}>

    <Router>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      <Routes>
      <Route path="/create" element= {<ProjectCreation />} />
      <Route path="/edit" element= {<ProjectCreation />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/tasks" element={<TaskList />} />
      <Route path="/create-task" element={<TaskCreation />} />
    <Route path="/edit-task" element={<TaskCreation />} />

        </Routes>
      
    </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
