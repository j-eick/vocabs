import { cleanEnv, port, str } from "envalid";

export default cleanEnv(process.env, {
  MONGO_DB: str(),
  PORT: port(),
});
