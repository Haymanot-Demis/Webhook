import { Transaction } from "../models/transaction.model";
import { AppDataSource } from "../data-source";

const transactionRepository = AppDataSource.getRepository(Transaction).extend({
	async createTransaction(payload: any) {
		const transaction = this.create(payload);

		return this.save(transaction);
	},
	async getTransactionById(id: string) {
		return this.findOne(id);
	},
	async getTransactions() {
		return this.find();
	},
});

export default transactionRepository;
