import "dotenv/config"; // necessary to use validateEnv
import env from "./util/validateEnv";
import mongoose from "mongoose";
import app from "./app";

mongoose.connect(env.MONGO_DB).then(() => {
  console.log("Mongoose connected successfully");
  app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
  });
});
