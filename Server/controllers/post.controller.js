import mongoose from 'mongoose';
import Post from '../models/post.model.js';

export const createPost = async (req, res) => {
    const login = req.body.login;
    const text = req.body.text;
    const newPost = new Post({
        _id: new mongoose.Types.ObjectId(),
        user: login,
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
    const id = req.params.id;
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

export const deletePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    await Post.findByIdAndRemove(id);
    res.json({ message: 'Post deleted successfully' });
};

export const likePost = async (req, res) => {
    const { id } = req.params;
    const { login } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    const post = await Post.findById(id);
    const index = post.likes.findIndex((loginLiked) => loginLiked === login);
    if (index === -1) {
        post.likes.push(login);
    } else {
        post.likes = post.likes.filter((loginLiked) => loginLiked !== login);
    }
    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true })
                                    .then(() => {
                                        res.status(200).json({
                                            success: true,
                                            message: 'Post is updated',
                                            updatePost: post,
                                        });
                                    }).catch((err) => {
                                        res.status(500).json({
                                            success: false,
                                            message: 'Server error. Please try again.',
                                            error: err.message,
                                        });
                                    })
};

export const savePost = async (req, res) => {
    const { id } = req.params;
    const { login } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    const post = await Post.findById(id);
    const index = post.saves.findIndex((loginSaved) => loginSaved === login);
    if (index === -1) {
        post.saves.push(login);
    } else {
        post.saves = post.saves.filter((loginSaved) => loginSaved !== login);
    }
    await Post.findByIdAndUpdate(id, post, { new: true })
                                    .then(() => {
                                        res.status(200).json({
                                            success: true,
                                            message: 'Post is updated',
                                            updatePost: post,
                                        });
                                    }).catch((err) => {
                                        res.status(500).json({
                                            success: false,
                                            message: 'Server error. Please try again.',
                                            error: err.message,
                                        });
                                    })
};

export const getAllLikedPosts = async (req, res) => {
    const login = req.params.login;
    await Post.find({ likes: login }).then((posts) => {
        res.status(200).json({
            success: true,
            message: 'Liked posts',
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
};

export const getAllSavedPosts = async (req, res) => {
    const login = req.params.login;
    await Post.find({ saves: login }).then((posts) => {
        res.status(200).json({
            success: true,
            message: 'Saved posts',
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
};