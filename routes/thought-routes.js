const router = require("express").Router();
const { Thought, User } = require("../models");

router.get("/thoughts", async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/thoughts/:thoughtId", async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/thoughts", async (req, res) => {
  try {
    const thought = await Thought.create(req.body);

    await User.findByIdAndUpdate(thought.username, {
      $push: { thoughts: thought._id },
    });

    res.json(thought);
  } catch (err) {
    res.status(400).json(err);
  }
});

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

router.delete("/thoughts/:thoughtId", async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);

    if (!thought) {
      res.status(404).json({ message: "Thought not found" });
      return;
    }

    await User.findByIdAndUpdate(thought.username, {
      $pull: { thoughts: thought._id },
    });

    res.json({ message: "Thought deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
