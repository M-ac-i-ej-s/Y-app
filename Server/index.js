import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from 'passport';
import path from 'path';
import { fileURLToPath } from 'url';

import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import postRouter from './routes/post.route.js';

import { cloudinaryConfig } from './config/cloudinaryConfig.js'

import { Strategy, ExtractJwt } from 'passport-jwt';

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import {createServer} from 'http';
const server = createServer(app);

import { Server } from "socket.io";
const io = new Server(server, {
    cors: {
      origin: "*"
    }
});

io.on('connection', (socket) => {
    let user = null;

    socket.on('setUser', (userSend) => {
        userSend.following.forEach((user) => {
            socket.join(user);
        })
        user = userSend;
    });

    socket.on('newPost', () => {
        socket.to(user.login).emit('newPosts', Math.random());
    });
});

mongoose.set('strictQuery', false)

app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('*', cloudinaryConfig);
mongoose.connect(
    'mongodb+srv://' +
        process.env.LOGIN +
        ':' +
        process.env.PASSWORD +
        process.env.DATABASE,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) {
            console.log('error in connection');
        } else {
            console.log('mongodb is connected');
        }
    }
);

app.use('/api/users', userRouter);
app.use('/api/auth',authRouter  );
app.use('/api/posts', postRouter);

// app.use(express.static(path.join(__dirname, '../Client/dist')));

// app.get(/^\/(?!api).*/, function (req, res) {
//   res.sendFile(path.join(__dirname, '../', 'Client', 'dist', 'index.html'));
// });

server.listen(process.env.PORT, () => {
    console.log(`Our server is running on port ${process.env.PORT}`);
});