import app from "./app";
import { APP_PORT } from "./config/config";
import { AppDataSource } from "./data-source";

async function startServer() {
	try {
		await AppDataSource.initialize();

		app.listen(APP_PORT, () => {
			console.log(`Yay, Express server has started on ${APP_PORT}.`);
		});
	} catch (error) {
		console.error("Failed to start server:", error);
	}
}

startServer();
