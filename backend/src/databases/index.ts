import { Sequelize } from "sequelize";
import { env } from "../config";

const postgresConfig = {
  host: env.POSTGRESQL_MASTER_HOST,
  username: env.POSTGRESQL_MASTER_USER,
  password: env.POSTGRESQL_MASTER_PASS,
  port: parseInt(env.POSTGRESQL_MASTER_PORT!) || 5432,
  database: env.POSTGRESQL_MASTER_DB,
};

export const sequelize = new Sequelize({
  dialect: "postgres",
  ...postgresConfig,
  logging: false,
  // logging:
  //   env.ENVIRONMENT === "development" ? false : (...msg) => console.log(msg),
  pool: {
    min: 20,
    max: 20,
  },
});

export interface ProcJsonResult {
  dno: number;
  proc_message: string;
  datajson: string;
}
