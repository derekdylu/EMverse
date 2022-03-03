const Mutation = {
    async createPost(parent, { emotion, text }, { db, pubsub }, info)
    {
        const post = new db.Post({
            created_at: Date.now(),
            emotion: emotion,
            text: text,
            is_visible: true,
        }).save();

        // subscription
        pubsub.publish(`POST MUTATION FROM ${emotion}`, 
            {
                postSubscription: { mutation: 'CREATED', post: post },
            });

        return post;
    },
    async updatePost(parent, { id }, { db, pubsub }, info)
    {
        try 
        {
            const post = await db.Post.findOne({ _id: id });
            if (post.is_visible){
                post.is_visible = false;
            }else{
                post.is_visible = true;
            }
            await db.Post.findOneAndUpdate({ _id: id }, post);
        }
        catch(e)
        {
            console.log(e);
        }

        // subscription

        return id;
    },
};

export default Mutation