import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const PostSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        user: {type: mongoose.Schema.Types.ObjectId},
        text: {type: String, required: true},
        likes: [{type: mongoose.Schema.Types.ObjectId}],
        replies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
        date: {type: Date, required: true},
        saves: [{type: mongoose.Schema.Types.ObjectId}],
    }
);

export default mongoose.model('Post', PostSchema);