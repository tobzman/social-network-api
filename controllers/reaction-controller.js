const { Reaction, Thought } = require("../models");

const reactionController = {
  // Get all reactions
  getAllReactions: async (req, res) => {
    try {
      const reactions = await Reaction.find();
      res.status(200).json(reactions);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  // Get a single reaction by ID
  getReactionById: async (req, res) => {
    try {
      const reaction = await Reaction.findById(req.params.reactionId);
      if (!reaction) {
        return res.status(404).json({ message: "Reaction not found" });
      }
      res.status(200).json(reaction);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  // Create a new reaction
  createReaction: async (req, res) => {
    try {
      const newReaction = await Reaction.create(req.body);
      // Associate the reaction with a thought
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }
      thought.reactions.push(newReaction._id);
      await thought.save();
      res.status(201).json(newReaction);
    } catch (error) {
      console.error(error);
      res.status(400).json(error);
    }
  },

  // Delete a reaction by ID
  deleteReaction: async (req, res) => {
    try {
      const reaction = await Reaction.findByIdAndDelete(req.params.reactionId);
      if (!reaction) {
        return res.status(404).json({ message: "Reaction not found" });
      }
      // Remove the reference to the reaction from the associated thought
      const thought = await Thought.findById(req.params.thoughtId);
      if (thought) {
        thought.reactions = thought.reactions.filter(
          (reactionId) => reactionId.toString() !== req.params.reactionId
        );
        await thought.save();
      }
      res.status(200).json({ message: "Reaction deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },
};

module.exports = reactionController;
