const express = require("express");
const router = express.Router();

// Import your route files
const userRoutes = require("./user-routes");
const thoughtRoutes = require("./thought-routes");
const reactionRoutes = require("./reaction-routes");

// Use the route files
router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);
router.use("/reactions", reactionRoutes);

module.exports = router;
