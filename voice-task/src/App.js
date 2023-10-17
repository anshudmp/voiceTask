import React, { useState } from 'react';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    projectTitle: '',
    projectManager: '',
    technologies: '',
    startDate: '',
    endDate:'',
  });
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', form);

    
    Object.entries(form).forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
    });

    setSubmissionSuccess(true);
  };

  const handleCreateProjectClick = () => {
    setShowForm(true);
    setSubmissionSuccess(false); // Reset success message when showing the form
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <header style={{ backgroundColor: 'rgb(59 32 94)', color: '#ffffff', padding: '10px', width: '100%', textAlign: 'left' }}>
        <h1 style={{ margin: 0, padding:10 }}>VOICETASK</h1>
      </header>
      <header style={{ marginTop: '20px' }}>
        <h1>Create New Project</h1>
      </header>
      <main>
        {!showForm ? (
          <button
            style={{
              padding: '15px 30px',
              backgroundColor: 'rgb(59 32 94)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '5px',
              fontSize: '18px',
              cursor: 'pointer',
            }}
            onClick={handleCreateProjectClick}
          >
            Create Project
          </button>
        ) : (
          <form
            onSubmit={handleSubmit}
            className={submissionSuccess ? 'success' : ''}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              padding: '20px',
              width: '350px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              marginTop: '20px',
              
            }}
          >
            {submissionSuccess ? (
              <p
                className="success-message"
                style={{ color: '#28a745', fontWeight: 'bold', textAlign: 'center', marginBottom: '10px' }}
              >
                Project created successfully!
              </p>
            ) : (
              <>
                <div style={{ marginBottom: '20px' }}>
                  <label htmlFor="projectTitle">Project Title</label>
                  <input
                    type="text"
                    id="projectTitle"
                    name="projectTitle"
                    value={form.projectTitle}
                    onChange={handleChange}
                    required
                    style={{ width: '95%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', outline: 'none' }}
                  />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <label htmlFor="projectManager">Project Manager</label>
                  <input
                    type="text"
                    id="projectManager"
                    name="projectManager"
                    value={form.projectManager}
                    onChange={handleChange}
                    required
                    style={{ width: '95%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', outline: 'none' }}
                  />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <label htmlFor="technologies">Technologies</label>
                  <input
                    type="text"
                    id="technologies"
                    name="technologies"
                    value={form.technologies}
                    onChange={handleChange}
                    required
                    style={{ width: '95%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', outline: 'none' }}
                  />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <label htmlFor="startDate">Start Date</label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                    required
                    style={{ width: '95%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', outline: 'none' }}
                  />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <label htmlFor="endDate">End Date</label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={form.endDate}
                    onChange={handleChange}
                    required
                    style={{ width: '95%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', outline: 'none' }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: 'rgb(59 32 94)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Submit
                </button>
              </>
            )}
          </form>
        )}
      </main>
    </div>
  );
}

export default App;
