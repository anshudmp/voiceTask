import React, { useState, useEffect } from 'react';
import './HomePage.css'; // Import a CSS file for styling

function HomePage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from your backend API when the component mounts
    fetch('http://localhost:5000/tasks')
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div className="task-grid">
      <h2>Task List</h2>
      <div className="task-cards">
        {tasks.map((task) => (
          <div key={task.id} className="task-card">
            <h3>{task.Title}</h3>
            <p>Manager: {task.Manager}</p>
            <p>Technologies: {task.Technologies}</p>
            <p>Start Date: {task.startdate}</p>
            <p>End Date: {task.enddate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
