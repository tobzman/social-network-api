const mongoose = require("mongoose");
const { User, Thought, Reaction } = require("../models");
const userData = require("./user.json");
const thoughtData = require("./thoughts.json");
const reactionData = require("./reaction.json");

mongoose.connect("mongodb://localhost/socialnetwork", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Seed users
    const users = await User.insertMany(userData);

    // Seed thoughts and reactions
    for (let i = 0; i < thoughtData.length; i++) {
      const thought = thoughtData[i];
      const user = users.find((u) => u.username === thought.username);

      const newThought = await Thought.create({
        thoughtText: thought.thoughtText,
        username: user.username,
      });

      const reaction = reactionData[i];
      reaction.username = user.username;

      const newReaction = await Reaction.create(reaction);

      newThought.reactions.push(newReaction._id);
      await newThought.save();

      user.thoughts.push(newThought._id);
      await user.save();
    }

    console.log("Database has been seeded!");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDatabase();
