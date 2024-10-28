import { Request, Response, Router } from "express";
import { webhookHandler } from "../controllers/webhook.controller";
import { validateData, validateIPAddress } from "../middlewares/validate";
import { webhookPayloadSchema } from "../validations/transactionWebhook.validation";
import { generateSignature } from "../utils/signature";
import { YAYA_SECRET_KEY } from "../config/config";
import { UUID } from "typeorm/driver/mongodb/bson.typings";
import { randomUUID } from "crypto";
import transactionRepository from "../repository/transaction.repository";

const router = Router();

router.post(
	"/webhook",
	// validateIPAddress([]),// add only allowed IP addresses
	validateData(webhookPayloadSchema),
	webhookHandler
);

router.get("/generateValidPayload", (req: Request, res: Response) => {
	const payload = {
		id: randomUUID(),
		amount: 100,
		currency: "ETB",
		created_at_time: 1673381836,
		timestamp: Date.now(),
		cause: "Testing",
		full_name: "Abebe Kebede",
		account_name: "abebekebede1",
		invoice_url: "https://yayawallet.com/en/invoice/xxxx",
	};

	const signature = generateSignature(payload, YAYA_SECRET_KEY);

	res.status(200).json({ payload, signature });
});

router.get("/getAllPayloads", async (req: Request, res: Response) => {
	const payloads = await transactionRepository.getTransactions();
	res.status(200).json({ payloads });
});

export default router;
