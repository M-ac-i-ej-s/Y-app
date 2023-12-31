import mongoose from 'mongoose';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

export const getUser = async (req, res) => {
    const userLogin = req.params.login;
    await User.find({login: userLogin})
        .then((singleUser) => {
            res.status(200).json({
                success: true,
                message: 'Single User',
                User: singleUser[0],
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'This user does not exist',
                error: err.message,
            });
        });
};

export const createUser = async (req, res) => {
    const hashedPwd = await bcrypt.hash(req.body.password, 10);
    User.find({ email: req.body.email }, (err, users) => {
        if (users.length) {
            return res.sendStatus(409);
        } else {
            const user = new User({
                _id: mongoose.Types.ObjectId(),
                login: req.body.type,
                email: req.body.name,
                telNumber: req.body.description,
                password: hashedPwd,
                bio:req.body.bio,
                avatar: req.body.avatar,
                location: null,
                website: null,
                birthDay: null,
                email: req.body.email,
                joinDate: new Date(),
                followers: [],
                following: [],
                posts: [],
                blockedUsers: [],
                savedPosts: [],
            });
            return user
                .save()
                .then((newUser) => {
                    return res.status(201).json({
                        success: true,
                        message: 'New user created successfully',
                        User: newUser,
                    });
                })
                .catch((error) => {
                    res.status(500).json({
                        success: false,
                        message: 'Server error. Please try again.',
                        error: error.message,
                    });
                });
        }
    });
};

export const updateUser = async (req, res) => {
    const userId = req.params.id;
    const updateObject = req.body;
    await User.updateOne({ _id: userId }, { $set: updateObject })
        .then(() => {
            res.status(200).json({
                success: true,
                message: 'User is updated',
                updateUser: updateObject,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: err.message,
            });
        });
};

export const updateLikedPosts = async (req, res) => {
    const userLogin = req.params.login;
    const postId = req.body.id;

    const user = await User.findOne({ login: userLogin });
    const index = user.likedPosts.findIndex((id) => String(id) === String(postId));
    if (index === -1) {
        user.likedPosts.push(postId);
    } else {
        user.likedPosts = user.likedPosts.filter((id) => String(id) !== String(postId));
    }

    await User.updateOne({login: userLogin}, user, { new: true })
                                    .then(() => {
                                        res.status(200).json({
                                            success: true,
                                            message: 'User is updated',
                                            updateUser: user,
                                        });
                                    }).catch((err) => {
                                        res.status(500).json({
                                            success: false,
                                            message: 'Server error. Please try again.',
                                            error: err.message,
                                        });
                                    })
};

export const updateSavedPosts = async (req, res) => {
    const userLogin = req.params.login;
    const postId = req.body.id;

    const user = await User.findOne({ login: userLogin });
    const index = user.savedPosts.findIndex((id) => String(id) === String(postId));
    if (index === -1) {
        user.savedPosts.push(postId);
    } else {
        user.savedPosts = user.savedPosts.filter((id) => String(id) !== String(postId));
    }

    await User.updateOne({login: userLogin}, user, { new: true })
                                    .then(() => {
                                        res.status(200).json({
                                            success: true,
                                            message: 'User is updated',
                                            updateUser: user,
                                        });
                                    }).catch((err) => {
                                        res.status(500).json({
                                            success: false,
                                            message: 'Server error. Please try again.',
                                            error: err.message,
                                        });
                                    })
};

export const updatePosts = async (req, res) => {
    const userLogin = req.params.login;
    const postId = req.body.id;

    const user = await User.findOne({ login: userLogin });
    const index = user.posts.findIndex((id) => String(id) === String(postId));
    if (index === -1) {
        user.posts.push(postId);
    } else {
        user.posts = user.posts.filter((id) => String(id) !== String(postId));
    }

    await User.updateOne({login: userLogin}, user, { new: true })
                                .then(() => {
                                    res.status(200).json({
                                        success: true,
                                        message: 'User is updated',
                                        updateUser: user,
                                    });
                                }).catch((err) => {
                                    res.status(500).json({
                                        success: false,
                                        message: 'Server error. Please try again.',
                                        error: err.message,
                                    });
                                });
};

export const updateReplies = async (req, res) => {
    const userLogin = req.params.login;
    const postId = req.body.id;

    const user = await User.findOne({ login: userLogin });
    const index = user.repliedPosts.findIndex((id) => String(id) === String(postId));

    if (index === -1) {
        user.repliedPosts.push(postId);
    } else {
        user.repliedPosts = user.repliedPosts.filter((id) => String(id) !== String(postId));
    }

    await User.updateOne({login: userLogin}, user, { new: true })
                                .then(() => {
                                    res.status(200).json({
                                        success: true,
                                        message: 'User is updated',
                                        updateUser: user,
                                    });
                                }).catch((err) => {
                                    res.status(500).json({
                                        success: false,
                                        message: 'Server error. Please try again.',
                                        error: err.message,
                                    });
                                });
};