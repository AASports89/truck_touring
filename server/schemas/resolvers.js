const { AuthenticationError } = require('apollo-server-express');
const { User, Game, Parlay } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
//PULL MODEL DATA//
  Query: {
    users: async () => {
      return User.find().populate('parlays');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('parlays');
    },
    parlays: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Parlay.find(params).sort({ createdAt: -1 }).populate('games');
    },
    parlay: async (parent, { parlayId }) => {
      return Parlay.findOne({ _id: parlayId });
    },
    games: async () => {
      return Game.find();
    },
    game: async (parent, args) => {
      return Game.findById(args.gameId);
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("parlays");
      }
      throw new AuthenticationError("Please login❗⛔");
    },
  },
//CHANGE MODEL DATA//
  Mutation: {
//CREATE USER//
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Error❗⛔ No user found with this login❗⛔');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Error❗⛔ Invalid login credentials❗⛔');
      }

      const token = signToken(user);

      return { token, user };
    },
//ADD PARLAY//
    addParlay: async (parent, { win_choice }, context) => {
      if(context.user) {
        const parlay = await Parlay.create({ 
          win_choice,
          username: context.user.username,
        });

      await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { parlays: parlay._id, username: context.user.username } },
          {
            new: true,
            runValidators: true,
          }
        );
        return parlay;
      }
      throw new AuthenticationError("Error❗⛔ Please login to set parlay❗⛔");
    },
//ADD GAME//
    addGame: async (parent, { parlayId, homeTeam, awayTeam, homeOdd, awayOdd }, context) => {
      if (context.user) {
        return Parlay.findOneAndUpdate(
          { _id: parlayId },
          {
            $addToSet: {
              games: { homeTeam, awayTeam, homeOdd, awayOdd, username: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("Error❗⛔ Please login to set parlay❗⛔");
    },
//DELETE PARLAY//
    removeParlay: async (parent, { parlayId }, context) => {
      if(context.user) {
        const parlay = await Parlay.findOneAndDelete({
          _id: parlayId,
          username: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { parlays: parlay._id }}
        );
        return parlay;
      }
      throw new AuthenticationError("Error❗⛔ Please login to delete parlay❗⛔");
    },
//DELETE GAME//
    removeGame: async (parent, { parlayId, gameId }, context) => {
      if (context.user) {
        return Parlay.findOneAndUpdate(
          { _id: parlayId },
          {$pull: {
            games: {
              _id: gameId,
              username: context.user.username,
            },
          },
        },
        { new: true }
        );
      }
      throw new AuthenticationError("Error❗⛔ Please login to set parlay❗⛔");
    },
  },
};

module.exports = resolvers;