import express from 'express';
import {
    getUser,
} from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.get('/:login', getUser)

export default userRouter;