require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express'); // Corrected module name
const connectDB = require('./config/db');
const userSchema = require('./schema/userSchema');
const teamSchema = require('./schema/teamSchema');
const projectSchema = require('./schema/projectSchema');
const userResolvers = require('./graphql/userResolvers');
const teamResolvers = require('./graphql/teamResolvers');
const projectResolvers = require('./graphql/projectResolvers');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cookieParser());
connectDB();

const server = new ApolloServer({
  typeDefs: [userSchema, teamSchema, projectSchema],
  resolvers: [userResolvers, teamResolvers, projectResolvers],
  context: ({ req, res }) => {
    const token = req.cookies.token || '';
    let user = null;
    if (token) {
      try {
        user = jwt.verify(token, process.env.JWT_SECRET);
      } catch (err) {
        console.error('Invalid token');
      }
    }
    return { user, res };
  }
});

const isAdmin = (req, res, next) => {
  const token = req.cookies.token || '';
  if (token) {
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      if (user.role === 'Admin') {
        return next();
      }
    } catch (err) {
      console.error('Invalid token');
    }
  }
  res.status(403).send('Forbidden');
};

app.use('/admin', isAdmin);

const PORT = process.env.PORT || 4000;

server.start().then(() => {
  server.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}${server.graphqlPath}`);
  });
});