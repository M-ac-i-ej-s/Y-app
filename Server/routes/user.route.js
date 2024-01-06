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
    updateFollowing,
    getAllFollowers,
    getAllFollowing,
    getAllBlockedUsers,
    updateBlockedUsers,
    getSearchUsers
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
userRouter.get('/:login/followers',loggedIn, getAllFollowers);
userRouter.get('/:login/following',loggedIn, getAllFollowing);
userRouter.get('/:login/blockedUsers',loggedIn, getAllBlockedUsers);
userRouter.patch('/:login/blockedUsers',loggedIn, updateBlockedUsers);
userRouter.get('/search', loggedIn, getSearchUsers);

export default userRouter;