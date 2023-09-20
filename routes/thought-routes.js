const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../controllers/thought-controller");

// Get all thoughts
router.get("/thoughts", getAllThoughts);

// Get a thought by ID
router.get("/thoughts/:thoughtId", getThoughtById);

// Create a new thought
router.post("/thoughts", createThought);

// Update a thought by ID
router.put("/thoughts/:thoughtId", updateThought);

// Delete a thought by ID
router.delete("/thoughts/:thoughtId", deleteThought);

// Create a reaction for a thought
router.post("/thoughts/:thoughtId/reactions", createReaction);

// Delete a reaction for a thought
router.delete("/thoughts/:thoughtId/reactions/:reactionId", deleteReaction);

module.exports = router;
