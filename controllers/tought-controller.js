const { User, Thought } = require("../models");

const thoughtController = {
    // gets all thoughts
    getAllThoughts: (req, res) => {
        Thought.find({})
            .select("-__v")
            .sort({ _id: -1 })
            .then(data => res.json(data))
            // logs errors
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    // retrieves thoughts by id
    getThoughtById(req, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: "thought",
                select: "-__v",
            })
            .populate({
                path: "reactions",
                select: "-__v",
            })
            .select("-__v")
            .then((data) => {
                console.log(data);
                if (!data) {
                    res.status(404).json({ message: "Thought does not exist" });
                }
                res.json(data);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // creates a new thought
    createThought(req, res) {
        Thought.create(req.body)
            .then(({ __id }) => {
                return User.findOneAndUpdate(
                    { _id: req.params.userId },
                    { $push: { thoughts: __id } },
                    { new: true }
                );
            })
            .then((data) => {
                if (!data) {
                    return res.status(404).json({ message: "Does not match an ID" });
                }
                res.json(data);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json();
            });
    },
    // update thoughts
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
            runValidators: true,
        })
            .then((data) => {
                if (!data) {
                    res.status(404).json({ message: "No thought found" });
                }
                res.json(data);
            })
            .catch((err) => {
                console.log(err);
            });
    },
    // delete thoughts
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then((data) => {
                if (!data) {
                    return res
                        .status(404)
                        .json({ message: "Thought cannot be found" });
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true }
                );
            })
            .then((data) => {
                if (!data) {
                    res.status(404).json({ message: "User does not exist" });
                    return;
                }
                res.json(true);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // deletes a reaction
    deleteReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: params.thoughtId } },
            { new: true }
        )
            .then((data) => res.json(data))
            .catch((err) => {
                console.log(err);
                res.status(404).json(err);
            });
    },
};

module.exports = thoughtController;

