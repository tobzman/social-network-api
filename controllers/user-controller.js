const { User, Thought } = require("../models");
const { Types } = require("mongoose");

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const allUsers = await User.find({}).populate("thoughts");

      if (!allUsers) return res.status(404).json({ message: "No users found" });

      res.status(200).json(allUsers);
    } catch (error) {
      res.status(400).json({ message: "An error has occurred" });
    }
  },

  getUserById: async (req, res) => {
    try {
      const findUser = await User.findById(req.params.id)
        .select(["-_id", "-id"])
        .populate("thoughts");

      if (!findUser) return res.status(404).json({ message: "No user found" });

      res.status(200).json(findUser);
    } catch (error) {
      console.log(error);
      res.status(404).json(error);
    }
  },

  createNewUser: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      res.status(200).json(newUser);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  updateUser: async (req, res) => {
    try {
      const updateUser = await User.findOneAndUpdate(
        { _id: new Types.ObjectId(req.params.id) },
        req.body,
        {
          new: true,
        }
      );

      console.log(updateUser);
      res.status(200).json(updateUser);
    } catch (error) {
      console.log(error);
      res.status(404).json(error);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const deletedUser = await User.findOneAndDelete({
        _id: new Types.ObjectId(req.params.id),
      });

      if (!deletedUser)
        return res.status(404).json({ message: "No user found" });

      if (deletedUser.thoughts.length > 0) {
        for (const thought of deletedUser.thoughts) {
          const deleteThought = await Thought.findOneAndDelete({
            _id: thought,
          });
        }
      }
      res.status(200).json({
        message: "The user has been deleted",
        user: deletedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(404).json(error);
    }
  },

  addFriend: async (req, res) => {
    try {
      const updateUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        {
          $addToSet: {
            friends: { _id: new Types.ObjectId(req.params.friendId) },
          },
        },
        {
          new: true,
        }
      );

      const otherUserUpdate = await User.findOneAndUpdate(
        { _id: req.params.friendId },
        {
          $addToSet: {
            friends: { _id: new Types.ObjectId(req.params.userId) },
          },
        },
        {
          new: true,
        }
      );

      res.status(200).json({
        message: "Users have added each other as friends",
        user1: updateUser,
        user2: otherUserUpdate,
      });
    } catch (error) {
      console.log(error);
      res.status(404).json(error);
    }
  },

  removeFriend: async (req, res) => {
    try {
      const updateUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        {
          $pull: {
            friends: new Types.ObjectId(req.params.friendId),
          },
        },
        {
          new: true,
        }
      );

      const otherUserUpdate = await User.findOneAndUpdate(
        { _id: req.params.friendId },
        {
          $pull: {
            friends: new Types.ObjectId(req.params.userId),
          },
        },
        {
          new: true,
        }
      );

      res.status(200).json({
        message: "Users have removed each other from their friend list",
        user1: updateUser,
        user2: otherUserUpdate,
      });
    } catch (error) {
      console.log(error);
      res.status(404).json(error);
    }
  },
};

module.exports = userController;
