import { Sequelize } from "sequelize";
import Logger from "../../config/logger";

const db = new Sequelize({
  dialect: "sqlite",
  storage: "./src/db/sqlite.db",
  logging: false,
});

export async function connection(database: Sequelize) {
  db.authenticate()
    .then(() => {
      Logger.info("Connection has been established successfully.");
    })
    .catch((err) => {
      Logger.error("Unable to connect to the database:", err);
      process.exit(1);
    });
}

export default db;
