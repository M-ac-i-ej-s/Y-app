import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

dotenv.config();
const app = express();
mongoose.set('strictQuery', false)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const corsOptions = {
    origin:'http://localhost:5173', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
};
app.use(cors(corsOptions));
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

app.use('/users', userRouter);
app.use('/auth',authRouter  );

app.listen(process.env.PORT, () => {
    console.log(`Our server is running on port ${process.env.PORT}`);
});