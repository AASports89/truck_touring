const { User } = require('../models');
const { bookSchema } = require('../models/Book')
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id }).populate('saved_books');
            }
            throw new AuthenticationError('Error❗⛔ Please Login❗⛔');
        }
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
          },
        login: async (parent, { email, password }) => {
            const user = await User.findOne( { email });
            if (!user) {
                throw new AuthenticationError('Error❗⛔ Invalid Credentials❗⛔')
            }
            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw) {
                throw new AuthenticationError('Error❗⛔ Invalid Password❗⛔')
            }
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { bookSchema }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: {savedBooks: bookSchema } },
                    { new: true }
                )
                return updatedUser;
            }
            throw new AuthenticationError('Error❗⛔ Please Login❗⛔')
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    { $pull: { savedBooks: { bookId: bookId } } },
                    { new: true }
                )
                return updatedUser;
            }
        }
    }
  };
  
  module.exports = resolvers;