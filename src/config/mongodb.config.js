import mongoose from "mongoose";

export const configureMongo = () => {
  mongoose.Promise = global.Promise;
  mongoose.connection.on("error", (err) => {
    console.error(err);
  });
  mongoose.connection.once("open", () => {
    console.log("[+] Connected to database successfully");
  });

  return mongoose.connect(
    process.env.MONGO_URL,
    {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
};
