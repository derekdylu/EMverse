import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const PostSchema = new Schema (
    {
        // id:
        created_at: Date,
        emotion: String,
        text: String,
        is_visible: Boolean,
    }
);

const Post = mongoose.model('Post', PostSchema);

export default Post