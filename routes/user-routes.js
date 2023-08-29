const router = require("express").Router();
const { Thought } = require("../models");

// POST new reaction to thought
router.post("/thoughts/:thoughtId/reactions", async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);

    if (!thought) {
      res.status(404).json({ message: "Thought not found" });
      return;
    }

    // Add the new reaction to the thought's reactions array
    thought.reactions.push(req.body);
    await thought.save();

    res.json(thought);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE reaction by ID from thought
router.delete(
  "/thoughts/:thoughtId/reactions/:reactionId",
  async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);

      if (!thought) {
        res.status(404).json({ message: "Thought not found" });
        return;
      }

      // Find the index of the reaction to be removed
      const reactionIndex = thought.reactions.findIndex(
        (reaction) => reaction._id.toString() === req.params.reactionId
      );

      if (reactionIndex === -1) {
        res.status(404).json({ message: "Reaction not found" });
        return;
      }

      // Remove the reaction from the reactions array
      thought.reactions.splice(reactionIndex, 1);
      await thought.save();

      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

module.exports = router;
