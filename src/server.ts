import app from "./app";
import { APP_PORT } from "./config/config";
import { AppDataSource } from "./data-source";

async function startServer() {
	try {
		const connection = await AppDataSource.initialize();
		console.log("Database connection established:", connection.isConnected);

		app.listen(APP_PORT || 3000, () => {
			console.log(`Yay, Express server has started on ${APP_PORT || 3000}.`);
		});
	} catch (error) {
		console.error("Failed to start server:", error);
	}
}

startServer();
