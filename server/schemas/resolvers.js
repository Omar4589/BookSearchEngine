const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
     // By adding context to our query, we can retrieve the logged in user without specifically searching for them
     me: async (parent, args, context) => {
      // if (context.user) {
        return User.findOne({ _id: context.user._id });
      // }
      // throw new AuthenticationError('You need to be logged in!');
    },
  },
  Mutation: {
    // create a user, sign a token, and send it back
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    // login a user, sign a token, and send it back
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user with this information found!");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(user);
      return { token, user };
    },

    // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
    saveBook: async (parent, { userId, bookData }, context) => {
      try {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { $addToSet: { savedBooks: bookData } },
            { new: true, runValidators: true }
          );
          return updatedUser;
        }
        throw new AuthenticationError("You need to be logged in!");
      } catch (err) {
        console.log(err);
        throw new Error("Error saving the book");
      }
    },

    removeBook: async (parent, { userId, bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: userId },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        if (updatedUser) {
          return updatedUser;
        } else {
          throw new Error("User not found or not updated.");
        }
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
