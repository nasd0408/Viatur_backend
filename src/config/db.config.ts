import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "viatur",
  entities: ["src/entity/**/*.entity.{ts,js}"],
  logging: true,
  //synchronize: true,
  migrations: ["src/migration/**/*.ts"],
})