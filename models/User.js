const { Schema, model } = require('mongoose');
// 
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
},
{
    toJSON: 
    {
        virtuals: true,
    },
    id: false
});
// returns length of the friends array
UserSchema.virtual('friendCount').get(() => {
    return this.friends.length;
});
//  returns length of thoughts array
UserSchema.virtual('thoughtCount').get(() => {
    return this.thoughts.length;
});
// out user schema in variable to be exported
const User = model('User', UserSchema);
module.exports = User;