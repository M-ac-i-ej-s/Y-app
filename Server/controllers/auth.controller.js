import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import { dataUri } from '../middleware/multer.middleware.js';
import { uploader } from '../config/cloudinaryConfig.js';

const jwtSecret = toString(process.env.TOKEN_SECRET);

export const Login = async (req, res) => {
    const email = req.body.email;
    const cookie = req.query.cookie || false
    const user = await User.findOne({ email: email });
    if (user == null) {
        res.status(400).json({
            success: false,
            message: 'Email or password incorrect!',
        });
    } else {
        let validate
        if(cookie === 'true'){
            validate = (req.body.password === user.password)
        } else {
            validate = await bcrypt.compare(req.body.password, user.password);
        }
        if (validate) {
            const token = createJWT(user);
            res.status(200).json({
                success: true,
                message: 'User logged in!',
                User: {
                    user: user,
                    token: token,
                },
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Email or password incorrect!',
            });
        }
    }
};

export const Register = async (req, res) => {
    let imageUrl = null;
    console.log(dataUri(req)[0].content)
    if(dataUri(req)[0].content) {
        const file = dataUri(req)[0].content;
        await uploader.upload(file).then((result) => {
            imageUrl = result.url
        }).catch((err) => {
            console.log(err)
        });
    } else {
        const file = './assets/userDeafult.jpg';
        await uploader.upload(file).then((result) => {
            imageUrl = result.url
        }).catch((err) => {
            console.log(err)
        });
    }

    const hashedPwd = await bcrypt.hash(req.body.password, 10);
    User.find({ email: req.body.email }, (err, users) => {
        if (users.length) {
            res.status(409).json({
                success: false,
                message: 'This user already exists!',
            });
        } else {
            const user = new User({
                _id: mongoose.Types.ObjectId(),
                login: req.body.login,
                email: req.body.email,
                telNumber: req.body.telNumber,
                password: hashedPwd,
                bio:req.body.bio,
                avatar: imageUrl,
                location: null,
                website: null,
                birthDay: null,
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
                    const token = createJWT(newUser);
                    return res.status(201).json({
                        success: true,
                        message: 'New user created successfully',
                        User: {
                            user: newUser,
                            token: token,
                        },
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

export const Logout = async (req, res) => {
    return res
        .status(200)
        .json({ success: true, message: 'Successfully logged out' });
};

const createJWT = (user) => {
    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
            type: user.type,
        },
        jwtSecret,
        {
            expiresIn: '7d',
        }
    );
    return token;
};