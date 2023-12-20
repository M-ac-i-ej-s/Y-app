import express from 'express';
import {
    getUser,
    createUser,
} from '../controllers/user.controller.js';
import { loggedIn } from '../middleware/auth.middleware.js';

const userRouter = express.Router();

userRouter.get('/:login',loggedIn, getUser)
userRouter.post('/', createUser);

export default userRouter;