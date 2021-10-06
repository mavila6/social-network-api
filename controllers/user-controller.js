const { User } = require('../models');

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
    // updates user 
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
            runValidators: true,
        })
            .then((data) => {
                if (!data) {
                    res.status(404).json({ message: "User does not exist" });
                    return;
                }
                res.json(data);
            })
            .catch((err) => res.status(400).json(err));
    },
    // deletes a user with id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then((data) => {
                if (!data) {
                    res.status(404).json({ message: "User does not exist" });
                    return;
                }
                // could do res.json(data) but we don't need the data. We just need to know that it was deleted.
                res.json(true);
            })
            .catch((err) => res.status(400).json(err));
    },
    // adds friend
    createFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: params.id } },
            { new: true }
        ).then((data) => {
            if (!data) {
                res.status(404).json({ message: "No friend with this id" });
                return;
            }
            User.findOneAndUpdate(
                { _id: params.friendId },
                { $addToSet: { friends: params.userId } },
                { new: true }
            )
                .then((data) => {
                    if (!data) {
                        res.status(404).json({ message: "No friend with this id" });
                    }
                    res.json(data);
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json(err);
                });
        });
    },
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { freinds: params.id } },
            { new: true }
        ).then((data) => {
            if (!data) {
                res.status(404).json({ message: "Friend not found" });
                return;
            }
            User.findOneAndUpdate(
                { _id: params.friendId },
                { $pull: { friends: params.userId } },
                { new: true }
            )
                .then((data) => {
                    if (!data) {
                        res.status(404).json({ message: "No friend with this ID" });
                    }
                    res.json(data);
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json(err);
                });
        });
    },
};

module.exports = userController;