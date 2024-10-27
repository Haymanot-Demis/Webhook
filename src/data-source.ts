import "reflect-metadata";
import { DataSource } from "typeorm";
import {
	DB_HOST,
	DB_PORT,
	DB_USERNAME,
	DB_PASSWORD,
	DB_NAME,
} from "./config/config";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: DB_HOST,
	port: +DB_PORT,
	username: DB_USERNAME,
	password: DB_PASSWORD,
	database: DB_NAME,
	synchronize: false,
	logging: false,
	entities: [__dirname + "/models/*.ts"],
	migrations: [__dirname + "/migration/*.ts"],
	subscribers: [],
});
