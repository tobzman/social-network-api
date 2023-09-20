const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../controllers/user-controller");

// Define routes that match user controller functions
router.route("/").get(getAllUsers).post(createNewUser);

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
