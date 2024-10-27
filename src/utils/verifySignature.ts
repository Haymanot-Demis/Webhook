import crypto from "crypto";

export const verifySignature = (
	payload: any,
	signature: string,
	secretKey: string
): boolean => {
	const data = Object.values(payload).join("");
	const expectedSignature = crypto
		.createHmac("sha256", secretKey)
		.update(data)
		.digest("hex");

	return expectedSignature === signature;
};

export const isReplayAttack = (
	timestamp: number,
	tolerance: number
): boolean => {
	const currentTimestamp = Date.now();
	return currentTimestamp - timestamp > tolerance;
};
