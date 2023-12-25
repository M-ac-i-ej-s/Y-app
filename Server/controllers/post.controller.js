import mongoose from 'mongoose';
import Post from '../models/post.model.js';

export const createPost = async (req, res) => {
    const id = req.user;
    const text = req.body.text;
    const newPost = new Post({
        _id: new mongoose.Types.ObjectId(),
        user: id,
        text: text,
        likes: [],
        replies: [],
        date: new Date(),
        saves: [],
    });
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUsersPosts = async (req, res) => {
    const id = req.user;
    console.log(req.user)
    await Post.find({ user: id }).then((posts) => {
        res.status(200).json({
            success: true,
            message: 'Users posts',
            Posts: posts,
        })
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'This user does not exist',
                error: err.message,
            });
        });
}