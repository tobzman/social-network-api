const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const Thought = require("./models/Thought");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect("mongodb://localhost/socialnetwork", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define your API routes here

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
