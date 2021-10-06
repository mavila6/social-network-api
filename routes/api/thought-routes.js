const router = require("express").Router();
const { getAllThoughts, createThought, getThoughtById,  updateThought, deleteThought, createReaction, deleteReaction } = require("../../controllers/thought-controller");

// router to get the thoughts
router
.route("/")
.get(getAllThoughts)
// router to creates thoughts using user id
router
    .route("/:userId")
    .post(createThought)
//  router to retrieve thoughts using user id and update/delete
router
    .route("/:id")
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)
// router to create and delete reactions
router
    .route("/:thoughtId/:reactions")
    .post(createReaction)
    .delete(deleteReaction)
//  export
module.exports = router