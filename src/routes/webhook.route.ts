import { Router } from "express";
import { webhookHandler } from "../controllers/webhook.controller";
import { validateData, validateIPAddress } from "../middlewares/validate";
import { webhookPayloadSchema } from "../validations/transactionWebhook.validation";

const router = Router();

router.post(
	"/webhook",
	validateIPAddress(["::ffff:127.0.0.1"]),
	validateData(webhookPayloadSchema),
	webhookHandler
);

export default router;
