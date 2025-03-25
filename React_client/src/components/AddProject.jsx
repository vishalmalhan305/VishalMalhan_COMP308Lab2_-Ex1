import { useState, useEffect } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './AddProject.css'; // Import CSS file

const ADD_PROJECT = gql`
  mutation AddProject($input: ProjectInput!) {
    createProject(input: $input) {
      id
      projectName
      status
    }
  }
`;

const GET_TEAMS = gql`
  query GetTeams {
    teams {
      id
      teamName
    }
  }
`;

const AddProject = () => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [team, setTeam] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('Pending');
  const [addProject, { loading, error }] = useMutation(ADD_PROJECT);
  const { loading: loadingTeams, error: errorTeams, data: dataTeams } = useQuery(GET_TEAMS);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addProject({ variables: { input: { projectName, description, team, startDate, endDate, status } } });
    setProjectName('');
    setDescription('');
    setTeam('');
    setStartDate('');
    setEndDate('');
    setStatus('Pending');
  };

  if (loadingTeams) return <p>Loading teams...</p>;
  if (errorTeams) return <p>Error loading teams: {errorTeams.message}</p>;

  return (
    <div className="add-project-form">
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Project Name:</Form.Label>
          <Form.Control type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Project Name" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description:</Form.Label>
          <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Team:</Form.Label>
          <Form.Control as="select" value={team} onChange={(e) => setTeam(e.target.value)}>
            <option value="">Select a team</option>
            {dataTeams.teams.map((team) => (
              <option key={team.id} value={team.id}>{team.teamName}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Start Date:</Form.Label>
          <Form.Control type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder="Start Date" />
        </Form.Group>
        <Form.Group>
          <Form.Label>End Date:</Form.Label>
          <Form.Control type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="End Date" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Status:</Form.Label>
          <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">Add Project</Button>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
      </Form>
    </div>
  );
};

export default AddProject;
