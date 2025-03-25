import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import './AdminDashboard.css'; // Import CSS file

const GET_TEAMS = gql`
  query GetTeams {
    teams {
      id
      teamName
      status
    }
  }
`;

const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      projectName
      status
    }
  }
`;

const AdminDashboard = () => {
  const { loading: loadingTeams, error: errorTeams, data: dataTeams } = useQuery(GET_TEAMS);
  const { loading: loadingProjects, error: errorProjects, data: dataProjects } = useQuery(GET_PROJECTS);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      const user = JSON.parse(atob(token.split('.')[1]));
      if (user.role !== 'Admin') {
        navigate('/');
      }
    }
  }, [navigate]);

  if (loadingTeams || loadingProjects) return <p>Loading...</p>;
  if (errorTeams) return <p>Error: {errorTeams.message}</p>;
  if (errorProjects) return <p>Error: {errorProjects.message}</p>;

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="admin-actions">
        <button onClick={() => navigate('/add-user')}>Add User</button>
        <button onClick={() => navigate('/add-team')}>Add Team</button>
        <button onClick={() => navigate('/add-project')}>Add Project</button>
      </div>
      <h3>Teams</h3>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {dataTeams.teams.map(team => (
            <tr key={team.id}>
              <td>{team.teamName}</td>
              <td>{team.status}</td>
              <td>
                <Link to={`/teams/${team.id}`} className="table-link">View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Projects</h3>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {dataProjects.projects.map(project => (
            <tr key={project.id}>
              <td>{project.projectName}</td>
              <td>{project.status}</td>
              <td>
                <Link to={`/projects/${project.id}`} className="table-link">View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
