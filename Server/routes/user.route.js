import express from 'express';
import {
    getUser,
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
    getSearchUsers,
    checkIfUserExists,
    checkIfEmailExists,
    checkIfPhoneExists,
    getSomeoneToFollow
} from '../controllers/user.controller.js';
import { loggedIn } from '../middleware/auth.middleware.js';
import { multerUploads } from '../middleware/multer.middleware.js';

const userRouter = express.Router();

userRouter.get('/:login/search', loggedIn, getSearchUsers);
userRouter.get('/:login/exists', checkIfUserExists);
userRouter.get('/:email/email', checkIfEmailExists);
userRouter.get('/:login/fiveFollow', loggedIn, getSomeoneToFollow);
userRouter.get('/:telNumber/phone', checkIfPhoneExists);
userRouter.get('/:login',loggedIn, getUser)
userRouter.put('/:id',loggedIn, multerUploads, updateUser);
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

export default userRouter;