import express from "express";
import config from "config";

import router from "./routes/Router";
import database, { connection } from "./db/connection";
import Logger from "../config/logger";
import morganMiddleware from "./middleware/morganMiddleware";

const app = express();
const port = config.get<number>("port");

app.use(express.json());

app.use(morganMiddleware);
app.use("/api/", router);

app.listen(port, async () => {
  await connection(database);

  Logger.info(`Server is running on port ${port}`);
});
