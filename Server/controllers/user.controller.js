import mongoose from 'mongoose';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

export const getUser = async (req, res) => {
    const userId = req.params.login;
    await User.find({_id: userId})
        .then((singleUser) => {
            res.status(200).json({
                success: true,
                message: 'Single User',
                User: singleUser,
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