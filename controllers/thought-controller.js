const { Thought, User } = require("../models");
const { Types } = require("mongoose");
const thoughtController = {
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find().sort({ createdAt: -1 });
      res.json(thoughts);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  getThoughtById: async (req, res) => {
    try {
      const thoughtId = req.params.thoughtId;
      const thought = await Thought.findOne({ _id: thoughtId });
      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  createThought: async (req, res) => {
    const { userId } = req.params;
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  },

  updateThought: async (req, res) => {
    const { thoughtId } = req.params;
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        req.body,
        { new: true }
      );
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  },

  deleteThought: async (req, res) => {
    const { thoughtId } = req.params;
    try {
      const thought = await Thought.findOneAndDelete({ _id: thoughtId });
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  },

  createReaction: async (req, res) => {
    const { thoughtId } = req.params;
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $push: { reactions: req.body } },
        { new: true }
      );
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  },

  deleteReaction: async (req, res) => {
    const { thoughtId, reactionId } = req.params;
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $pull: { reactions: { reactionId: reactionId } } },
        { new: true }
      );
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  },
};

module.exports = thoughtController;
