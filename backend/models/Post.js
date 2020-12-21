import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const postSchema = new Schema({
    from: {
        type: String
    },
    to: {
        type: String
    },
    message: {
        type: String
    },
    files: {
        type: Array
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})

const postModel = mongoose.model("posts", postSchema);

export default postModel;