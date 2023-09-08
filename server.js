const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect("mongodb://localhost/socialnetwork", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define your API routes here
app.use(routes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
