import { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './AddTeam.css'; // Import CSS file

const ADD_TEAM = gql`
  mutation AddTeam($input: TeamInput!) {
    createTeam(input: $input) {
      id
      teamName
      status
    }
  }
`;

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      username
    }
  }
`;

const AddTeam = () => {
  const [teamName, setTeamName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Active');
  const [customField, setCustomField] = useState('');
  const [members, setMembers] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [addTeam, { loading, error }] = useMutation(ADD_TEAM, {
    onCompleted: () => {
      setSuccessMessage('Team successfully added!');
    }
  });
  const { loading: loadingUsers, error: errorUsers, data: dataUsers } = useQuery(GET_USERS);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTeam({ variables: { input: { teamName, description, status, customField, members } } });
    setTeamName('');
    setDescription('');
    setStatus('Active');
    setCustomField('');
    setMembers([]);
  };

  if (loadingUsers) return <p>Loading users...</p>;
  if (errorUsers) return <p>Error loading users: {errorUsers.message}</p>;

  return (
    <div className="add-team-form">
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Team Name:</Form.Label>
          <Form.Control type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="Team Name" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description:</Form.Label>
          <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Status:</Form.Label>
          <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Custom Field:</Form.Label>
          <Form.Control type="text" value={customField} onChange={(e) => setCustomField(e.target.value)} placeholder="Custom Field" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Members:</Form.Label>
          <Form.Control as="select" multiple value={members} onChange={(e) => setMembers([...e.target.selectedOptions].map(option => option.value))}>
            {dataUsers.users.map(user => (
              <option key={user.id} value={user.id}>{user.username}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">Add Team</Button>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {successMessage && <p>{successMessage}</p>}
      </Form>
    </div>
  );
};

export default AddTeam;