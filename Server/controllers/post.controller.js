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
        isReply: false,
    });
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const postReply = async (req, res) => {
    const id = req.params.id;
    const login = req.body.login;
    const text = req.body.text;
    const user = req.body.user;
    const newPost = new Post({
        _id: new mongoose.Types.ObjectId(),
        user: login,
        text: text,
        likes: [],
        replies: [],
        date: new Date(),
        saves: [],
        isReply: true,
        replyTo: {
            id: id,
            user: user,
        }
    });
    try {
        await newPost.save();
        await Post.findByIdAndUpdate(id, { $push: { replies: newPost._id } });
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
    const id = req.params.id;
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

    const post = await Post.findById(id);
    if(post.replies.length > 0) {
        post.replies.forEach(async (reply) => {
            await deletePostRecursively(reply);
        });
    }

    await Post.findByIdAndRemove(id);
    res.json({ message: 'Post deleted successfully' });
};

export const deletePostRecursively = async (postId) => {
    const id = postId;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    const post = await Post.findById(id);
    if(post.replies.length > 0) {
        post.replies.forEach(async (reply) => {
            await deletePostRecursively(reply);
        });
    }

    await Post.findByIdAndRemove(id);
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

export const getPostReplies = async (req, res) => {
    const posts = [];
    const id = req.params.id;
    await Post.findById(id).then(async (post) => {
        for (let i = 0; i < post.replies.length; i++) {
            await Post.findById(post.replies[i]).then((reply) => {
                posts.push(reply);
            });
        }
        res.status(200).json({
            success: true,
            message: 'Replies',
            Posts: posts,
        })
    }).catch((err) => {
        res.status(500).json({
            success: false,
            message: 'This post does not exist',
            error: err.message,
        });
    });
};

export const updateReplies = async (req, res) => {
    const { postId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(postId)) return res.status(404).send('No post with that id');
    const post = await Post.findById(postId);
    post.replies = post.replies.filter((id) => id !== String(postId));
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

export const getAllReplies = async (req, res) => {
    const login = req.params.login;
    await Post.find({ user: login, isReply: true }).then((posts) => {
        res.status(200).json({
            success: true,
            message: 'Replies',
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

export const getSearchedPosts = async (req, res) => {
    const text = req.query.q;
    const type = req.query.f;
    let seenIds = [];
    if(req.query.seenIds !== '') {
        seenIds = req.query.seenIds.split(',');
    }
    const login = req.query.login;
    if(type === 'live' && type !== 'people') {
        await Post.find({ text: { $regex: text, $options: 'i' }, _id: {$nin: seenIds}, user: {$nin: login} }).sort({date:-1}).limit(10).then((posts) => {
            res.status(200).json({
                success: true,
                message: 'Searched posts',
                Posts: posts || [],
            })
            })
    } else {
        await Post.find({ text: { $regex: text, $options: 'i' }, _id: {$nin: seenIds},user: {$nin: login}}).sort({likes:-1}).limit(10).then((posts) => {
            res.status(200).json({
                success: true,
                message: 'Searched posts',
                Posts: posts || [],
                })
            })
    }
};
