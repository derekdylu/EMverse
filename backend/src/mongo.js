import mongoose from 'mongoose';

export default async function connectDB(mongoUrl) {
  try {
    await mongoose.connect(mongoUrl, {
      serverSelectionTimeoutMS: 5_000,
    });
    console.info('MongoDB connected.');
  } catch {
    console.error('MongoDB connection failed. Check MONGO_URL and server access.');
    throw new Error('Unable to connect to MongoDB.');
  }
}
