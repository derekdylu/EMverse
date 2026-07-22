const Subscription = {
  postSubscription: {
    subscribe(parent, { emotion }, { pubSub }) {
      return pubSub.subscribe(`post:${emotion}`);
    },
    resolve(payload) {
      return payload;
    },
  },
};

export default Subscription;
