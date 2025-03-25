import React, { useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import './ProjectDetails.css'; // Import CSS file

const GET_PROJECT = gql`
  query GetProject($id: ID!) {
    project(id: $id) {
      projectName
      description
      team {
        teamName
      }
      startDate
      endDate
      status
    }
  }
`;

const UPDATE_PROJECT_STATUS = gql`
  mutation UpdateProjectStatus($id: ID!, $status: String!) {
    updateProject(id: $id, input: { status: $status }) {
      id
      status
    }
  }
`;

const ProjectDetails = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });
  const [updateProjectStatus] = useMutation(UPDATE_PROJECT_STATUS);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { project } = data;

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    await updateProjectStatus({ variables: { id, status: newStatus } });
  };

  return (
    <div className="project-details">
      <h2>{project.projectName}</h2>
      <p>{project.description}</p>
      <p>Team: {project.team.teamName}</p>
      <p>Start Date: {project.startDate}</p>
      <p>End Date: {project.endDate}</p>
      <p>Status: {project.status}</p>
      <select value={project.status} onChange={handleStatusChange}>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
};

export default ProjectDetails;