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
    getSearchedPosts
} from '../controllers/post.controller.js';
import { loggedIn } from '../middleware/auth.middleware.js';

const postRouter = express.Router();

postRouter.get('/',loggedIn, getAllPosts);
postRouter.post('/',loggedIn, createPost);
postRouter.get('/search', loggedIn, getSearchedPosts)
postRouter.get('/:id',loggedIn, getUsersPosts);
postRouter.delete('/:id',loggedIn, deletePost);
postRouter.patch('/:id/likePost',loggedIn, likePost);
postRouter.get('/:login/likedPosts',loggedIn, getAllLikedPosts);
postRouter.patch('/:id/savePost',loggedIn, savePost);
postRouter.get('/:login/savedPosts',loggedIn, getAllSavedPosts);
postRouter.get('/one/:id', getPost);
postRouter.post('/:id',loggedIn, postReply);
postRouter.get('/:id/replies',loggedIn, getPostReplies);
postRouter.patch('/:id/replies',loggedIn, updateReplies);
postRouter.get('/:login/allReplies',loggedIn, getAllReplies);


export default postRouter;