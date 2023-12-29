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
    getAllSavedPosts 
} from '../controllers/post.controller.js';
import { loggedIn } from '../middleware/auth.middleware.js';

const postRouter = express.Router();

postRouter.get('/', getAllPosts);
postRouter.post('/',loggedIn, createPost);
postRouter.get('/:id',loggedIn, getUsersPosts);
postRouter.delete('/:id',loggedIn, deletePost);
postRouter.patch('/:id/likePost',loggedIn, likePost);
postRouter.get('/:login/likedPosts',loggedIn, getAllLikedPosts);
postRouter.patch('/:id/savePost',loggedIn, savePost);
postRouter.get('/:login/savedPosts',loggedIn, getAllSavedPosts);

export default postRouter;