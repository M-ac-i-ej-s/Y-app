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

export const checkIfUserExists = async (req, res) => {
    const userLogin = req.params.login;
    try {
        const user = await User.find({login: userLogin})
        if(user.length) {
            res.status(200).json({
                success: true,
                message: 'Single User',
                User: true,
            });
        } else {
            res.status(200).json({
                success: true,
                message: 'Single User',
                User: false,
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'This user does not exist',
            error: err.message,
        });
    
    }
};

export const checkIfEmailExists = async (req, res) => {
    const userEmail = req.params.email;
    try {
        const user = await User.find({email: userEmail})
        if(user.length) {
            res.status(200).json({
                success: true,
                message: 'Single User',
                User: true,
            });
        } else {
            res.status(200).json({
                success: true,
                message: 'Single User',
                User: false,
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'This user does not exist',
            error: err.message,
        });
    
    }
};

export const checkIfPhoneExists = async (req, res) => {
    const userPhone = req.params.phone;
    try {
        const user = await User.find({telNumber: userPhone})
        if(user.length) {
            res.status(200).json({
                success: true,
                message: 'Single User',
                User: true,
            });
        } else {
            res.status(200).json({
                success: true,
                message: 'Single User',
                User: false,
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'This user does not exist',
            error: err.message,
        });
    
    }
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

export const updateFollowing = async (req, res) => {
    const userLogin = req.params.login;
    const followerUser = req.body.user;

    const user = await User.findOne({ login: userLogin });
    const index = user.following.findIndex((login) => String(login) === String(followerUser));

    if (index === -1) {
        user.following.push(followerUser);
    } else {
        user.following = user.following.filter((login) => String(login) !== String(followerUser));
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

export const updateFollowers = async (req, res) => {
    const userLogin = req.params.login;
    const followerUser = req.body.user;

    const user = await User.findOne({ login: followerUser });
    const index = user.followers.findIndex((login) => String(login) === String(userLogin));

    if (index === -1) {
        user.followers.push(userLogin);
    } else {
        user.followers = user.followers.filter((login) => String(login) !== String(userLogin));
    }

    await User.updateOne({login: followerUser}, user, { new: true })
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

export const getAllFollowers = async (req, res) => {
    const userLogin = req.params.login;
    await User.find({ following: userLogin }).then((users) => {
        res.status(200).json({
            success: true,
            message: 'Followers',
            Users: users,
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

export const getAllFollowing = async (req, res) => {
    const userLogin = req.params.login;
    await User.find({ followers: userLogin }).then((users) => {
        res.status(200).json({
            success: true,
            message: 'Following',
            Users: users,
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

export const getAllBlockedUsers = async (req, res) => {
    const userLogin = req.params.login;
    
    const user = await User.findOne({ login: userLogin });
    const blockedUsers = user.blockedUsers;

    await User.find({ login: {$in: blockedUsers} }).then((users) => {
        res.status(200).json({
            success: true,
            message: 'Blocked users',
            Users: users,
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

export const updateBlockedUsers = async (req, res) => {
    const userLogin = req.params.login;
    const blockedUser = req.body.user;

    const user = await User.findOne({ login: userLogin });
    const index = user.blockedUsers.findIndex((login) => String(login) === String(blockedUser));

    if (index === -1) {
        user.blockedUsers.push(blockedUser);
    } else {
        user.blockedUsers = user.blockedUsers.filter((login) => String(login) !== String(blockedUser));
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

export const getSearchUsers = async (req, res) => {
    const userLogin = req.params.login;
    let seenIds = [];
    if(req.query.seenIds !== '') {
        seenIds = req.query.seenIds.split(',');
    }
    const search = req.query.q;

    await User.find({ login: {$regex: search, $options: 'i',$nin: userLogin}, _id: {$nin: seenIds} }).sort({followers: -1}).limit(10).then((users) => {
        res.status(200).json({
            success: true,
            message: 'Search users',
            Users: users || [],
        })
        })
};

export const getSomeoneToFollow = async (req, res) => {
    const userLogin = req.params.login;
    let seenIds = [];
    if(req.query.seenIds !== '') {
        seenIds = req.query.seenIds.split(',');
    }

    await User.find({ _id: {$nin: seenIds}, login: {$nin: userLogin}, followers: {$nin: userLogin} }).sort({followers: -1}).limit(5).then((users) => {
        res.status(200).json({
            success: true,
            message: 'Search users',
            Users: users || [],
        })
        })
};