import { Transaction } from "../models/transaction.model";
import { verifySignature, isReplayAttack } from "../utils/verifySignature";
import transactionRepository from "../repository/transaction.repository";
import { YAYA_SECRET_KEY, YAYA_WALLET_TOLERANCE } from "../config/config";
import { Request, Response } from "express";
import { catchAsync } from "../utils/asyncHandler";

export const webhookHandler = catchAsync(
	async (req: Request, res: Response): Promise<any> => {
		const payload = req.body;

		const signature = req.headers["yaya-signature"] as string;

		const secretKey = YAYA_SECRET_KEY as string;

		// Verify the signature, to make sure the payload is unaltered
		if (!verifySignature(payload, signature, secretKey)) {
			return res.status(403).json({ error: "Invalid signature" });
		}

		// Check for replay attacks
		const timestamp = payload.timestamp;

		if (isReplayAttack(timestamp, +YAYA_WALLET_TOLERANCE)) {
			console.log({ error: "Replay attack detected" });
			return res.status(403).json({ error: "Old payload" });
		}

		// Respond quick and then store the transaction in the database
		res.status(200).json({ status: "success" });
		const transaction = await transactionRepository.createTransaction(payload);
	}
);
