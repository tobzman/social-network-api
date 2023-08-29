const router = require("express").Router();
const { Thought, User } = require("../models");

// GET all thoughts
router.get("/thoughts", async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET thought by ID
router.get("/thoughts/:thoughtId", async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST new thought
router.post("/thoughts", async (req, res) => {
  try {
    const thought = await Thought.create(req.body);

    // Push the thought's _id to the associated user's thoughts array
    await User.findByIdAndUpdate(thought.username, {
      $push: { thoughts: thought._id },
    });

    res.json(thought);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT update thought by ID
router.put("/thoughts/:thoughtId", async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      req.body,
      { new: true }
    );
    res.json(thought);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE thought by ID
router.delete("/thoughts/:thoughtId", async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);

    if (!thought) {
      res.status(404).json({ message: "Thought not found" });
      return;
    }

    // Remove the thought's _id from the associated user's thoughts array
    await User.findByIdAndUpdate(thought.username, {
      $pull: { thoughts: thought._id },
    });

    res.json({ message: "Thought deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
