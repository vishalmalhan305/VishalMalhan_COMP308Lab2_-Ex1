const { gql } = require('apollo-server-express');

const teamSchema = gql`
  type Team {
    id: ID!
    teamName: String!
    description: String
    members: [User]
    createdDate: String
    status: String
    customField: String
  }

  input TeamInput {
    teamName: String!
    description: String
    members: [ID]
    status: String
    customField: String
  }

  type Query {
    teams: [Team]
    team(id: ID!): Team
  }

  type Mutation {
    createTeam(input: TeamInput): Team
    updateTeam(id: ID!, input: TeamInput): Team
  }
`;

module.exports = teamSchema;