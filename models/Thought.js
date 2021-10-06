const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
// schema
const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        min: [1, 'Must be more than one character'],
        max: [280, 'Cannot exceed 280 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
        type: String,
        uniqued: true,
        trim: true,
        required: 'Username Required!',
    },
    reactions: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
});
// returns length of the reaction array
ThoughtSchema.virtual('reactionCount').get(() => {
    return this.reactions.length;
});
//  put thought schema in variable to be exported
const Thought = model('Thought', ThoughtSchema);
module.exports = Thought;