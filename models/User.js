const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: "Username Required!",
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: "Email Required!",
        match: [/.+@.+\..+/, "Invalid Email!"]
    },
    thoughts: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});
