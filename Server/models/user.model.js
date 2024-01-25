import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const UserSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        login: {type: String, required: true},
        email: { type: String, required: true },
        telNumber: { type: String, required: true },
        password: {type: String, required: true},
        bio: {type: String, required: false},
        avatar: {type: String, required: false},
        location: {type: String, required: false},
        website: {type: String, required: false},
        joinDate: {type: Date, required: false},
        followers: [{type: String}],
        following: [{type: String}],
        blockedUsers:  [{type: String}],
        backgroundPhoto: {type: String, required: false},
    }
);

export default mongoose.model('User', UserSchema);