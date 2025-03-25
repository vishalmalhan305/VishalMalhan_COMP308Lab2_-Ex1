const Project = require('../models/Project');

const projectResolvers = {
  Query: {
    projects: async () => await Project.find().populate('team'),
    project: async (_, { id }) => await Project.findById(id).populate('team')
  },
  Mutation: {
    createProject: async (_, { input }) => {
      const project = new Project(input);
      await project.save();
      return project;
    },
    updateProject: async (_, { id, input }) => {
      const project = await Project.findByIdAndUpdate(id, input, { new: true });
      return project;
    }
  }
};

module.exports = projectResolvers;