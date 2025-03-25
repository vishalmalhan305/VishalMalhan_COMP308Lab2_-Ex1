const { gql } = require('apollo-server-express');

const projectSchema = gql`
  type Project {
    id: ID!
    projectName: String!
    description: String
    team: Team
    startDate: String
    endDate: String
    status: String
  }

  input ProjectInput {
    projectName: String!
    description: String
    team: ID
    startDate: String
    endDate: String
    status: String
  }

  type Query {
    projects: [Project]
    project(id: ID!): Project
  }

  type Mutation {
    createProject(input: ProjectInput): Project
    updateProject(id: ID!, input: ProjectInput): Project
  }
`;

module.exports = projectSchema;