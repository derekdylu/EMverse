const emotionsList = "HAHA-ANGRY-SAD-WOW-FEAR-DISGUST".split("-");

const Query = {
    async postsByEmotion (parent, { emotion }, { db, pubsub }, info)
    {
        const posts = await db.Post.find({ emotion: emotion });
        return posts;
    },
    async emotionsCount (parent, {}, {db, pubsub}, info)
    {
        let count = [];
        for(let i = 0; i < emotionsList.length; i++){
            let posts = await db.Post.find({ emotion: emotionsList[i] });
            if(posts === null){
                count.push(0);
                continue;
            }
            count.push(posts.length);
        }

        return count;
    },
};

export default Query