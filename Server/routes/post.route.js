import express from 'express';
import { 
    createPost, 
    getAllPosts, 
    getPost, 
    getUsersPosts, 
    deletePost, 
    likePost, 
    getAllLikedPosts, 
    savePost, 
    getAllSavedPosts,
    postReply,
    getPostReplies,
    updateReplies,
    getAllReplies,
    getSearchedPosts,
    getPostsByFollowedUsers,
    postRepost
} from '../controllers/post.controller.js';
import { loggedIn } from '../middleware/auth.middleware.js';

const postRouter = express.Router();

postRouter.get('/',loggedIn, getAllPosts);
postRouter.get('/search', loggedIn, getSearchedPosts)
postRouter.get('/:login',loggedIn, getUsersPosts);
postRouter.get('/:login/likedPosts',loggedIn, getAllLikedPosts);
postRouter.get('/:login/savedPosts',loggedIn, getAllSavedPosts);
postRouter.get('/one/:id', getPost);
postRouter.get('/:id/replies',loggedIn, getPostReplies);
postRouter.get('/:login/allReplies',loggedIn, getAllReplies);
postRouter.get('/:login/followedPosts',loggedIn, getPostsByFollowedUsers);
postRouter.post('/',loggedIn, createPost);
postRouter.post('/:id/repost',loggedIn, postRepost);
postRouter.post('/:id/reply',loggedIn, postReply);
postRouter.patch('/:id/likePost',loggedIn, likePost);
postRouter.patch('/:id/savePost',loggedIn, savePost);
postRouter.patch('/:id/replies',loggedIn, updateReplies);
postRouter.delete('/:id',loggedIn, deletePost);


export default postRouter;