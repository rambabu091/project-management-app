import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', projectId: '' });
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchTasks();
    if (user.role === 'Admin') {
      fetchProjects();
    }
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await api.get('/tasks');
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const { data } = await api.get('/projects');
      setProjects(data);
      if (data.length > 0) {
        setNewTask(prev => ({ ...prev, projectId: data[0].id }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTask.projectId) {
      return alert('You must create a Project first before creating a task!');
    }
    try {
      await api.post('/tasks', newTask);
      setShowModal(false);
      setNewTask({ title: '', description: '', projectId: projects.length > 0 ? projects[0].id : '' });
      fetchTasks();
    } catch (err) {
      alert('Error creating task.');
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await api.patch(`/tasks/${taskId}/status`, { status: newStatus });
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  if (loading) return <div>Loading dashboard...</div>;

  const todo = tasks.filter(t => t.status === 'TODO');
  const inProgress = tasks.filter(t => t.status === 'IN_PROGRESS');
  const done = tasks.filter(t => t.status === 'DONE');

  const renderTaskCard = (task) => (
    <div key={task.id} className="card" style={{ marginBottom: '1rem', padding: '1rem' }}>
      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{task.title}</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>{task.description}</p>
      <div className="flex justify-between items-center">
        <select 
          className={`badge ${task.status}`} 
          value={task.status} 
          onChange={(e) => updateTaskStatus(task.id, e.target.value)}
          style={{ cursor: 'pointer', border: 'none', appearance: 'auto', outline: 'none' }}
        >
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>
        {task.project && <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>{task.project.name}</span>}
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1>Dashboard</h1>
        {user.role === 'Admin' && (
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            + New Task
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        <div>
          <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            To Do <span className="badge" style={{ background: 'var(--surface-hover)' }}>{todo.length}</span>
          </h2>
          {todo.map(renderTaskCard)}
          {todo.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No tasks here.</p>}
        </div>

        <div>
          <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            In Progress <span className="badge" style={{ background: 'var(--warning)', color: '#fff' }}>{inProgress.length}</span>
          </h2>
          {inProgress.map(renderTaskCard)}
          {inProgress.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No tasks here.</p>}
        </div>

        <div>
          <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Done <span className="badge" style={{ background: 'var(--success)', color: '#fff' }}>{done.length}</span>
          </h2>
          {done.map(renderTaskCard)}
          {done.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No tasks here.</p>}
        </div>

      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px' }}>
            <h2 className="mb-6">Create New Task</h2>
            <form onSubmit={handleCreateTask}>
              <div className="input-group">
                <label>Task Title</label>
                <input value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} required />
              </div>
              <div className="input-group">
                <label>Description</label>
                <textarea value={newTask.description} onChange={e => setNewTask({...newTask, description: e.target.value})} rows="3" />
              </div>
              <div className="input-group">
                <label>Project</label>
                <select value={newTask.projectId} onChange={e => setNewTask({...newTask, projectId: e.target.value})} required>
                  {projects.length === 0 && <option value="">No projects available (Create one first!)</option>}
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between mt-4">
                <button type="button" className="btn" onClick={() => setShowModal(false)} style={{ background: 'var(--surface-hover)' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={!newTask.projectId}>Create Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
