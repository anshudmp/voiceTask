import React, { useState } from 'react';
import HomePage from './components/HomePage';
import TaskCreation from './components/TaskCreation';
import { BrowserRouter as Router, Route, Link,Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <header style={{ backgroundColor: 'rgb(59 32 94)', color: '#ffffff', padding: '10px', width: '100%', textAlign: 'left' }}>
       <nav style={{display:'flex',marginLeft:'1%'}}>
        <Link to = "/">
        <h3 style={{color:'white'}}>Voice Task</h3>
        </Link>
       
        <Link to="/home">
              <h3 style={{color:'white',paddingLeft:"25%" }}> Home</h3>
            </Link>
        </nav>
      </header>
      <Routes>
      <Route path="/" element= {<TaskCreation />} />
      <Route path="/home" element={<HomePage />} />
        </Routes>
      
    </div>
    </Router>
  );
}

export default App;
