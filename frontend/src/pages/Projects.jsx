import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '' });
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await api.get('/projects');
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/projects', newProject);
      setShowModal(false);
      setNewProject({ name: '', description: '' });
      fetchProjects();
    } catch (err) {
      alert('Error creating project. Are you an Admin?');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1>Projects</h1>
        {user.role === 'Admin' && (
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            + New Project
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {projects.map(p => (
          <div key={p.id} className="card">
            <h2 style={{ marginBottom: '0.5rem' }}>{p.name}</h2>
            <p style={{ color: 'var(--text-muted)' }}>{p.description}</p>
            <div style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Created: {new Date(p.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
        {projects.length === 0 && <p>No projects found.</p>}
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px' }}>
            <h2 className="mb-6">Create New Project</h2>
            <form onSubmit={handleCreate}>
              <div className="input-group">
                <label>Project Name</label>
                <input value={newProject.name} onChange={e => setNewProject({...newProject, name: e.target.value})} required />
              </div>
              <div className="input-group">
                <label>Description</label>
                <textarea value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} rows="3" />
              </div>
              <div className="flex justify-between mt-4">
                <button type="button" className="btn" onClick={() => setShowModal(false)} style={{ background: 'var(--surface-hover)' }}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
