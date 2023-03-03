import * as dotenv from "dotenv";
dotenv.config();
import { DataSource } from "typeorm";

const TypeOrmDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  name: "default",
  entities: ["src/**/*.entity.*"],
  logging: true,
  synchronize: true,
});

export default TypeOrmDataSource;
