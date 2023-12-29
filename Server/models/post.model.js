import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const PostSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        user: {type: String, required: true},
        text: {type: String, required: true},
        likes: [{type: String}],
        replies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
        date: {type: Date, required: true},
        saves: [{type: String}],
        repeats: [{type: String}],
        isReply: {type: Boolean, required: true},
    }
);

export default mongoose.model('Post', PostSchema);