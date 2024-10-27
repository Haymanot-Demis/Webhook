import Joi, { valid } from "joi";
import { catchAsync } from "../utils/asyncHandler";
import { Request, Response, NextFunction } from "express";

export const validateData = (schema: Joi.ObjectSchema<any>) => {
	return catchAsync((req: Request, res: Response, next: NextFunction) => {
		const objectToValidate = req.body;
		const { error } = schema.validate(objectToValidate, {
			abortEarly: true,
			allowUnknown: true,
		});
		if (error) {
			return res.status(422).json({ error: error.message });
		} else {
			next();
		}
	});
};

export const validateIPAddress = (validIPs: string[]) => {
	return catchAsync((req: Request, res: Response, next: NextFunction) => {
		const ipAddress = req.ip;

		if (!validIPs.includes(ipAddress)) {
			return res.status(422).json({ error: "Unallowed IP address" });
		} else {
			next();
		}
	});
};
