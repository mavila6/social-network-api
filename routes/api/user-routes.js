const router = require("express").Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    createFriend,
    deleteFriend
} = require("../../controllers/user-controller");
//  router to all users
router
    .route("/")
    .get(getAllUsers)
    .post(createUser)
//  router to make changes based on user id
router
    .route("/:id")
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)
// router to update friends list
router
    .route("/:userId/friends/:friendId")
    .post(createFriend)
    .delete(deleteFriend)

module.exports = router
