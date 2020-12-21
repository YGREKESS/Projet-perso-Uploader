import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const fileSchema = new Schema({
    name: {
        type: String
    },
    originalname: {
        type: String
    },
    mimetype: {
        type: String
    },
    size: {
        type: Number
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})

const fileModel = mongoose.model("files", fileSchema);

export default fileModel;