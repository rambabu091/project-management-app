import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, LogOut } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '1rem 2rem' }}>
      <div className="container flex justify-between items-center" style={{ padding: 0 }}>
        <h2 style={{ color: 'var(--primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FolderKanban /> ProjectFlow
        </h2>
        <div className="flex gap-4 items-center">
          <Link to="/dashboard" style={{ color: 'var(--text-main)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link to="/projects" style={{ color: 'var(--text-main)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FolderKanban size={18} /> Projects
          </Link>
          <button onClick={handleLogout} className="btn" style={{ background: 'transparent', color: 'var(--danger)', padding: '0.5rem' }}>
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
}
