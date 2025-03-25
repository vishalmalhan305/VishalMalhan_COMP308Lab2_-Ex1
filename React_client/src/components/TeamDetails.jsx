import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import './TeamDetails.css'; // Import CSS file

const GET_TEAM = gql`
  query GetTeam($id: ID!) {
    team(id: $id) {
      teamName
      description
      members {
        id
        username
      }
      customField
      status
    }
  }
`;

const TeamDetails = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_TEAM, { variables: { id } });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { team } = data;

  return (
    <div className="team-details">
      <h2>{team.teamName}</h2>
      <p>{team.description}</p>
      <p>Status: {team.status}</p>
      <p>Custom Field: {team.customField}</p>
      <h3>Members:</h3>
      <ul>
        {team.members.map(member => (
          <li key={member.id}>{member.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default TeamDetails;