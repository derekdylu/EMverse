import mongoose from 'mongoose';

const EMOTIONS = ['HAHA', 'ANGRY', 'SAD', 'WOW', 'FEAR', 'DISGUST'];

const PostSchema = new mongoose.Schema({
  created_at: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  emotion: {
    type: String,
    enum: EMOTIONS,
    required: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500,
  },
  is_visible: {
    type: Boolean,
    default: true,
  },
});

const Post = mongoose.model('Post', PostSchema);

export default Post;
