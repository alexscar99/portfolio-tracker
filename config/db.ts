import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    // tslint:disable-next-line:no-console
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    // tslint:disable-next-line:no-console
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
};
