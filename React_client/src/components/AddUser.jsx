import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './AddUser.css'; // Import CSS file

const ADD_USER = gql`
  mutation AddUser($input: UserInput!) {
    createUser(input: $input) {
      id
      username
      email
      role
    }
  }
`;

const AddUser = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Member');
  const [addUser, { loading, error }] = useMutation(ADD_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addUser({ variables: { input: { username, email, password, role } } });
    setUsername('');
    setEmail('');
    setPassword('');
    setRole('Member');
  };

  return (
    <div className="add-user-form">
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Role:</Form.Label>
          <Form.Control as="select" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Admin">Admin</option>
            <option value="Member">Member</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">Add User</Button>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
      </Form>
    </div>
  );
};

export default AddUser;