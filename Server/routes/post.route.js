import express from 'express';
import { createPost, getAllPosts, getPost, getUsersPosts } from '../controllers/post.controller.js';
import { loggedIn } from '../middleware/auth.middleware.js';

const postRouter = express.Router();

postRouter.get('/', getAllPosts);
postRouter.post('/',loggedIn, createPost);
postRouter.get('/:id', getPost);
postRouter.get('/user', getUsersPosts);

export default postRouter;