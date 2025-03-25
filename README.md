# VishalMalhan_COMP308Lab2_-Ex1

## Team/Project Management System

### Overview
This project is a team/project management system built using the MERN stack (MongoDB, Express, React, Node.js) with GraphQL and Apollo Server. It provides CRUD functionalities for managing users, teams, and projects through an Express GraphQL API and a React Vite front-end.

### Features

#### Express GraphQL API
- CRUD functionalities for managing users, teams, and projects.
- **User model** with fields:
    - Username
    - Email
    - Password (hashed)
    - Role (Admin, Member)
- **Team model** with fields:
    - Team name
    - Description
    - Members (Array of ObjectId references to User model)
    - Created date
    - Status (Active/Inactive)
    - Custom field (e.g., team slogan, expertise level, etc.)
- **Project model** with fields:
    - Project name
    - Description
    - Team (Reference to a team)
    - Start date
    - End date
    - Status (In Progress, Completed, Pending)
- MongoDB database for storing information and establishing relationships between users, teams, and projects.
- Authentication/authorization using JWT and HTTPOnly cookies.
- GraphQL queries and mutations to expose data.

#### React Vite Front-end
- User-friendly UI using functional components, composition, and React Hooks.
- Login functionality for users.
- **Team member features:**
    - View team details
    - View assigned projects
    - Update project status
- **Admin user features:**
    - Create users
    - Create teams
    - Assign projects to teams
    - List all teams and projects
    - List all members in a team
- Apollo Client for managing GraphQL data fetching.

### MVC Architecture
- Model-View-Controller (MVC) principles applied to the Express API for a structured and maintainable codebase.
- Responsive and accessible UI design.
