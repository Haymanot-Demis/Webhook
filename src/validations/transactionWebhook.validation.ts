import Joi from "joi";

export const webhookPayloadSchema = Joi.object({
	id: Joi.string().required(),
	amount: Joi.number().required(),
	currency: Joi.string().required(),
	created_at_time: Joi.number().required(),
	timestamp: Joi.number().required(),
	cause: Joi.string().required(),
	full_name: Joi.string().required(),
	account_name: Joi.string().required(),
	invoice_url: Joi.string().uri().required(),
});
