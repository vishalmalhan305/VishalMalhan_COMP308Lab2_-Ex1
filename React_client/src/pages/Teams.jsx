import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import './Teams.css'; // Import CSS file

const GET_TEAMS = gql`
  query GetTeams {
    teams {
      id
      teamName
      status
    }
  }
`;

const Teams = () => {
  const { loading, error, data } = useQuery(GET_TEAMS);
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
    <div className="teams-page">
      <h2>Teams</h2>
      <table>
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.teams.map(team => (
            <tr key={team.id}>
              <td>
                <Link to={`/teams/${team.id}`}>{team.teamName}</Link>
              </td>
              <td>{team.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Teams;