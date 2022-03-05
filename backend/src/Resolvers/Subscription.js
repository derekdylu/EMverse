const Subscription = 
{
    postSubscription:
    {
        subscribe (parent, { emotion }, { db, pubsub }, info)
        {
            return pubsub.asyncIterator(`POST MUTATION FROM ${emotion}`);
        },
    },
    // TODO: add subscription of emotions count
};

export default Subscription