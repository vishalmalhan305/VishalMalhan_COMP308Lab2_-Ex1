import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login';
import TeamDetails from './components/TeamDetails';
import ProjectDetails from './components/ProjectDetails';
import AdminDashboard from './components/AdminDashboard';
import Teams from './pages/Teams';
import Projects from './pages/Projects';
import AddUser from './components/AddUser';
import AddTeam from './components/AddTeam';
import AddProject from './components/AddProject';
import './App.css';
import { useState, useEffect } from 'react';
import CustomNavbar from './components/Navbar';

function App() {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = JSON.parse(atob(token.split('.')[1]));
      setUsername(user.username);
      setRole(user.role);
    }
  }, []);

  return (
    <Router>
      <CustomNavbar username={username} role={role} setUsername={setUsername} setRole={setRole} />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} /> 
          <Route path="/login" element={<Login setUsername={setUsername} setRole={setRole} />} />
          <Route path="/teams/:id" element={<TeamDetails />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/projects" element={<Projects />} />
          {role === 'Admin' && (
            <>
              <Route path="/add-user" element={<AddUser />} />
              <Route path="/add-team" element={<AddTeam />} />
              <Route path="/add-project" element={<AddProject />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
