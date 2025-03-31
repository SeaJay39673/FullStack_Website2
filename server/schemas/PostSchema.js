const mongoose = require('mongoose');

// Define the Post Schema
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    posterID: {
        type: mongoose.Schema.Types.ObjectId, // Refers to the ObjectId of the poster
        required: true,
        ref: 'Account' // Assume it's referencing a 'User' model
    }
});

// Create the Post model
const Post = mongoose.model('Post', postSchema);

module.exports = Post;