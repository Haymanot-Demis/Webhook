import request from "supertest";
import app from "../src/app";
import { AppDataSource } from "../src/data-source";
import { createHmac } from "crypto";
import dotenv from "dotenv";
import { YAYA_SECRET_KEY } from "../src/config/config";

dotenv.config();

// Generate HMAC SHA256 signature for test cases
const generateSignature = (payload: object, secretKey: string) => {
	const payloadString = Object.values(payload).join("");
	return createHmac("sha256", secretKey).update(payloadString).digest("hex");
};

describe("Webhook API Tests", () => {
	const secretKey = YAYA_SECRET_KEY;

	beforeAll(async () => {
		await AppDataSource.initialize();
	});

	afterAll(async () => {
		await AppDataSource.destroy();
	});

	test("Should process valid payload and return 200", async () => {
		const validPayload = {
			id: "1dd2854e-3a79-4548-ae36-97e4a18ebf81",
			amount: 100,
			currency: "ETB",
			created_at_time: 1673381836,
			timestamp: Math.floor(Date.now()),
			cause: "Testing",
			full_name: "Abebe Kebede",
			account_name: "abebekebede1",
			invoice_url: "https://yayawallet.com/en/invoice/xxxx",
		};

		const signature = generateSignature(validPayload, secretKey);

		const response = await request(app)
			.post("/webhook")
			.set("YAYA-SIGNATURE", signature)
			.send(validPayload);

		expect(response.status).toBe(200);
	});

	test("Should return 401 for invalid signature", async () => {
		const validPayload = {
			id: "1dd2854e-3a79-4548-ae36-97e4a18ebf81",
			amount: 100,
			currency: "ETB",
			created_at_time: 1673381836,
			timestamp: Date.now(),
			cause: "Testing",
			full_name: "Abebe Kebede",
			account_name: "abebekebede1",
			invoice_url: "https://yayawallet.com/en/invoice/xxxx",
		};

		const invalidSignature = generateSignature(
			{ ...validPayload, amount: 1000 },
			YAYA_SECRET_KEY
		); // Alter the payload to make the signature invalid

		const response = await request(app)
			.post("/webhook")
			.set("YAYA-SIGNATURE", invalidSignature)
			.send(validPayload);

		expect(response.status).toBe(403);
		expect(response.body).toHaveProperty("error", "Invalid signature");
	});

	test("Should prevent replay attacks by rejecting old timestamps", async () => {
		const oldPayload = {
			id: "1dd2854e-3a79-4548-ae36-97e4a18ebf81",
			amount: 100,
			currency: "ETB",
			created_at_time: 1673381836,
			timestamp: Date.now() - 600000, // 10 mins old timestamp
			cause: "Testing",
			full_name: "Abebe Kebede",
			account_name: "abebekebede1",
			invoice_url: "https://yayawallet.com/en/invoice/xxxx",
		};

		const signature = generateSignature(oldPayload, secretKey);

		const response = await request(app)
			.post("/webhook")
			.set("YAYA-SIGNATURE", signature)
			.send(oldPayload);

		expect(response.status).toBe(403);
		expect(response.body).toHaveProperty("error", "Old payload");
	});

	test("Should return 422 for missing required fields", async () => {
		const incompletePayload = {
			amount: 100,
			currency: "ETB",
			cause: "Testing",
			full_name: "Abebe Kebede",
			account_name: "abebekebede1",
		};

		const signature = generateSignature(incompletePayload, secretKey);

		const response = await request(app)
			.post("/webhook")
			.set("YAYA-SIGNATURE", signature)
			.send(incompletePayload);

		expect(response.status).toBe(422);
		expect(response.body).toHaveProperty("error");
	});
});
