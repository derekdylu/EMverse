const Post = 
{
    id (parent, args, { db }, info)
    {
        return db.Post.findById(id);
    }
};

export default Post