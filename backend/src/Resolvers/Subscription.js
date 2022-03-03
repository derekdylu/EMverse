const Subscription = 
{
    postSubscription:
    {
        subscribe (parent, { emotion }, { db, pubsub }, info)
        {
            return pubsub.asyncIterator(`POST MUTATION FROM ${emotion}`);
        },
    },
};

export default Subscription