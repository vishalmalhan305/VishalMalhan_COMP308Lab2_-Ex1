const Team = require('../models/Team');

const teamResolvers = {
  Query: {
    teams: async () => await Team.find().populate('members'),
    team: async (_, { id }) => await Team.findById(id).populate('members')
  },
  Mutation: {
    createTeam: async (_, { input }) => {
      const team = new Team(input);
      if (input.members && input.members.length > 0) {
        team.members = input.members;
      }
      await team.save();
      return team;
    },
    updateTeam: async (_, { id, input }) => {
      const team = await Team.findByIdAndUpdate(id, input, { new: true });
      return team;
    }
  }
};

module.exports = teamResolvers;