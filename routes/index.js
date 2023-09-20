const express = require("express");
const router = express.Router();

const userRoutes = require("./user-routes");
const thoughtRoutes = require("./thought-routes");
const reactionRoutes = require("./reaction-routes");


router.use("/api/users", userRoutes); 
router.use("/api/thoughts", thoughtRoutes); 
router.use("/api/reactions", reactionRoutes); 

module.exports = router;
