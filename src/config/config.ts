import { config } from "dotenv";

config();
const envVars = process.env;

export const { APP_PORT, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } =
	envVars;

export const YAYA_SECRET_KEY = envVars.YAYA_SECRET_KEY;
export const YAYA_WALLET_TOLERANCE = envVars.TOLERANCE;
