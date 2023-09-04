const { User } = require("../models");

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find()
        .populate("thoughts")
        .populate("friends")
        .select("-__v");
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  getUserById: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findOne({ _id: userId })
        .populate("thoughts")
        .populate("friends")
        .select("-__v");
      if (!user) {
        return res.status(404).json({ message: "No user with this id!" });
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  createUser: async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  },

  updateUser: async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await User.findOneAndUpdate({ _id: userId }, req.body, {
        new: true,
      });
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  },

  deleteUser: async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await User.findOneAndDelete({ _id: userId });
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  },

  addFriend: async (req, res) => {
    const { userId } = req.params;
    const { friendId } = req.body;

    try {
      const user = await User.findOne({ _id: userId });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.friends.includes(friendId)) {
        return res.status(400).json({ message: "Friend already added" });
      }

      user.friends.push(friendId);

      const updatedUser = await user.save();

      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  removeFriend: async (req, res) => {
    const { userId, friendId } = req.params;

    try {
      const user = await User.findOne({ _id: userId });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const friendIndex = user.friends.indexOf(friendId);

      if (friendIndex === -1) {
        return res
          .status(400)
          .json({ message: "Friend not found in the user's friend list" });
      }

      user.friends.splice(friendIndex, 1);

      const updatedUser = await user.save();

      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
