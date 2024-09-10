import "dotenv/config";
import env from "./util/validateEnv";
import mongoose from "mongoose";
import app from "./app";

mongoose.connect(env.MONGO_DB).then(() => {
  console.log("Mongoose connected successfully");
  app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
  });
});

// async function run() {
//   try {
//     const client = new MongoClient(env.MONGO_DB);
//     await client.connect();
//     const db = client.db("blog");
//     const posts = await db.collection("post").find().toArray();
//   } catch (err) {
//     console.error(err);
//   }
// }
// run();
