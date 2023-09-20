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

router.get("/thoughts/:thoughtId", getThoughtById);

router.post("/thoughts", createThought);

router.put("/thoughts/:thoughtId", updateThought);


router.delete("/thoughts/:thoughtId", deleteThought);

// Create a reaction for a thought
router.post("/thoughts/:thoughtId/reactions", createReaction);

// Delete a reaction for a thought
router.delete("/thoughts/:thoughtId/reactions/:reactionId", deleteReaction);

module.exports = router;
