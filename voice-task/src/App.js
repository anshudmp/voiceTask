import React, { useState } from 'react';
import HomePage from './components/HomePage';
import ProjectCreation from './components/ProjectCreation';
import TaskList from './components/TaskList';
import TaskCreation from './components/TaskCreation';

import { BrowserRouter as Router, Route, Link,Routes } from 'react-router-dom';


function App() {
  return (
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
  );
}

export default App;
