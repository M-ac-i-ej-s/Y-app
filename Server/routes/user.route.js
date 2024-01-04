import express from 'express';
import {
    getUser,
    createUser,
    updateUser,
    updateLikedPosts,
    updateSavedPosts,
    updatePosts,
    updateReplies,
    updateFollowers,
    updateFollowing
} from '../controllers/user.controller.js';
import { loggedIn } from '../middleware/auth.middleware.js';

const userRouter = express.Router();

userRouter.get('/:login',loggedIn, getUser)
userRouter.post('/', createUser);
userRouter.put('/:id',loggedIn, updateUser);
userRouter.patch('/:login/likedPosts',loggedIn, updateLikedPosts);
userRouter.patch('/:login/savedPosts',loggedIn, updateSavedPosts);
userRouter.patch('/:login/posts',loggedIn, updatePosts);
userRouter.patch('/:login/replies',loggedIn, updateReplies);
userRouter.patch('/:login/followers',loggedIn, updateFollowers);
userRouter.patch('/:login/following',loggedIn, updateFollowing);

export default userRouter;