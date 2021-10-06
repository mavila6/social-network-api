const { Thought, User } = require('../models');

const userController = {
    // gets all users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: "thoughts",
                select: "-__v",
            })
            .select("-__v")
            .sort({ _id: -1 })
            .then((data) => res.json(data))
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    //  finds user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: "thoughts",
                select: "-__v",
            })
            .populate({
                path: "friends",
                select: "-__v",
            })
            .select("-__v")
            .then((data) => {
                console.log(data);
                if (!data) {
                    res.status(404).json({ message: "No user with this id" });
                }
                res.json(data);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // creates new user
    createUser({ body }, res) {
        User.create(body)
            .then((data) => res.json(data))
            .catch((err) => res.status(400).json(err));
    },

};

module.exports = userController;