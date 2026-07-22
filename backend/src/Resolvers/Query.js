const emotionsList = ['HAHA', 'ANGRY', 'SAD', 'WOW', 'FEAR', 'DISGUST'];

const Query = {
  postsByEmotion(parent, { emotion }, { db }) {
    return db.Post.find({
      emotion,
      is_visible: true,
    })
      .sort({ created_at: -1 })
      .limit(100);
  },

  emotionsCount(parent, args, { db }) {
    return Promise.all(
      emotionsList.map((emotion) =>
        db.Post.countDocuments({ emotion, is_visible: true }),
      ),
    );
  },
};

export default Query;
