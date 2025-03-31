const express = require('express');
const router = express.Router();
const Post = require('../schemas/PostSchema'); // Import the Post model
const authenticateToken = require("../middleware/authenticateToken")

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('posterID', 'username email')
        res.status(200).json({ posts })
    } catch (error) {
        console.error('Error fetching posts:', error)
        res.status(500).json({ message: 'Internal server error.' })
    }
})

// Create a post
router.post('/post', authenticateToken, async (req, res) => {
    try {
        const { title, content } = req.body

        // Validate input
        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required.' })
        }

        const newPost = new Post({
            title,
            content,
            author: req.user.username,
            posterID: req.user.id,
        })

        await newPost.save()
        res.status(201).json({ message: 'Post created successfully.', post: newPost })
    } catch (error) {
        console.error('Error creating post:', error)
        res.status(500).json({ message: 'Internal server error.' })
    }
})

router.route("/post/:id")
    .get(async (req, res) => {
        try {
            const post = await Post.findById(req.params.id).populate('posterID', 'username email')
            if (!post) {
                return res.status(404).json({ message: 'Post not found.' })
            }
            res.status(200).json(post)
        } catch (error) {
            console.error('Error fetching post:', error)
            res.status(500).json({ message: 'Internal server error.' })
        }
    })
    .put(authenticateToken, async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)

            if (!post) {
                return res.status(404).json({ message: 'Post not found.' })
            }

            // Check if the user is the author of the post
            if (post.posterID.toString() !== req.user.id) {
                return res.status(403).json({ message: 'You are not authorized to update this post.' })
            }

            const { title, content } = req.body

            // Update fields
            if (title) post.title = title
            if (content) post.content = content

            await post.save()
            res.status(200).json({ message: 'Post updated successfully.', post })
        } catch (error) {
            console.error('Error updating post:', error)
            res.status(500).json({ message: 'Internal server error.' })
        }
    }).delete(authenticateToken, async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)

            if (!post) {
                return res.status(404).json({ message: 'Post not found.' })
            }

            // Check if the user is the author of the post
            if (post.posterID.toString() !== req.user.id) {
                return res.status(403).json({ message: 'You are not authorized to delete this post.' })
            }

            await Post.findByIdAndDelete(post._id)
            res.status(200).json({ message: 'Post deleted successfully.' })
        } catch (error) {
            console.error('Error deleting post:', error)
            res.status(500).json({ message: 'Internal server error.' })
        }
    })

module.exports = router