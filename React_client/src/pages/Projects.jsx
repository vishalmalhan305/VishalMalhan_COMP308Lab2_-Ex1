import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import './Projects.css'; // Import CSS file

const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      projectName
      status
    }
  }
`;

const Projects = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="projects-page">
      <h2>Projects</h2>
      <table>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.projects.map(project => (
            <tr key={project.id}>
              <td>
                <Link to={`/projects/${project.id}`}>{project.projectName}</Link>
              </td>
              <td>{project.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Projects;