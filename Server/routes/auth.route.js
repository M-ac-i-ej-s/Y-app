import express from 'express';
import { Login, Logout, Register } from '../controllers/auth.controller.js';
import { multerUploads } from '../middleware/multer.middleware.js';

const authRouter = express.Router();

authRouter.get('/logout', Logout);
authRouter.post('/login', Login);
authRouter.post('/register', multerUploads, Register);

export default authRouter;