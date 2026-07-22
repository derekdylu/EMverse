const Post = {
  id(parent) {
    return parent.id || parent._id?.toString();
  },
};

export default Post;
