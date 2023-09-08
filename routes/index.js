const express = require("express");
const router = express.Router();

// Import your route files
const userRoutes = require("./user-routes");
const thoughtRoutes = require("./thought-routes");
const reactionRoutes = require("./reaction-routes");

// Define the route paths for your models
router.use("/users", userRoutes); // Example: /api/users will use userRoutes
router.use("/thoughts", thoughtRoutes); // Example: /api/thoughts will use thoughtRoutes
router.use("/reactions", reactionRoutes); // Example: /api/reactions will use reactionRoutes

module.exports = router;
