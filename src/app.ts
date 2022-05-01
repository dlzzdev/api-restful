import express from "express";
import config from "config";
import router from "./Routes/Router";
import database, { connection } from "./db/connection";
import Logger from "../config/logger";

const app = express();
const port = config.get<number>("port");

app.use(express.json());

app.use("/api/", router);

app.listen(port, async () => {
  await connection(database);

  Logger.info(`Server is running on port ${port}`);
});
