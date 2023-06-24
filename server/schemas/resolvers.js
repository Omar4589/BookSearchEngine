const { User, Book } = require("../models");

const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // get a single user by either their id or their username
    getSingleUser: async (_, { userId, username }) => {
      const foundUser = await User.findOne({
        $or: [{ _id: userId }, { username }],
      });

      if (!foundUser) {
        throw new Error("Cannot find a user with this id or username!");
      }

      return foundUser;
    },
  },
  Mutation: {
    // create a user, sign a token, and send it back
    addUser: async (_, { input }) => {
      const user = await User.create(input);

      if (!user) {
        throw new Error("Something went wrong!");
      }

      const token = signToken(user);
      return { token, user };
    },

    // login a user, sign a token, and send it back
    loginUser: async (_, { username, email, password }) => {
      const user = await User.findOne({ $or: [{ username }, { email }] });

      if (!user) {
        throw new AuthenticationError('No user with this information found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
       throw new AuthenticationError('Incorrect password!');
     }

      const token = signToken(user);
      return { token, user };
    },

    // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
    saveBook: async (_, { userId, bookInput }) => {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: userId },
          { $addToSet: { savedBooks: bookInput } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      } catch (err) {
        console.log(err);
        throw new Error("Error saving the book");
      }
    },

    // remove a book from `savedBooks`
    removeBook: async (_, { userId, bookId }) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );

      if (!updatedUser) {
        throw new Error("Couldn't find user with this id!");
      }

      return updatedUser;
    },
  },
};

module.exports = resolvers;
