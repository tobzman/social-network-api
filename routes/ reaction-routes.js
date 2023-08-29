const router = require("express").Router();
const { User, Thought } = require("../models");

// GET all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET user by ID
router.get("/users/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate("thoughts")
      .populate("friends");

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST new user
router.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT update user by ID
router.put("/users/:userId", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
    });
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE user by ID
router.delete("/users/:userId", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Delete the user's associated thoughts
    await Thought.deleteMany({ username: user.username });

    res.json({ message: "User and associated thoughts deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
