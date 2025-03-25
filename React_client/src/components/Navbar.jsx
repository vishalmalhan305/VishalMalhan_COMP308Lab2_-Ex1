import { useEffect } from 'react';
import './Navbar.css'; // Import custom CSS
import { useNavigate } from 'react-router-dom';

function CustomNavbar({ username, role, setUsername, setRole }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Token:', token);
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Decoded payload:', payload);
      setUsername(payload.username);
      setRole(payload.role);
      console.log('Logged in as', payload.username);
      console.log('Role:', payload.role);
    }
  }, [setUsername, setRole]);

  const handleLogin = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    navigate('/login');
    window.location.reload();
    console.log('Login clicked');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUsername('');
    setRole('');
    navigate('/login');
    console.log('Logged out');
  };

  return (
    <nav className="custom-navbar">
      <div className="container">
        <div className="navbar-left">
          <a className="navbar-brand" href="/">Team Management System</a>
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/teams">Teams</a></li>
            <li><a href="/projects">Projects</a></li>
            {role === 'Admin' && <li><a href="/admin">Admin Dashboard</a></li>}
          </ul>
        </div>
        <div className="navbar-right">
          <span>Signed in as: <a href="#login">{username || 'Guest'}</a></span>
          {!username ? (
            <button className="login-button" onClick={handleLogin}>Login</button>
          ) : (
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default CustomNavbar;
