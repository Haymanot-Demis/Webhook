import {
	Entity,
	PrimaryColumn,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
} from "typeorm";

@Entity()
export class Transaction {
	@PrimaryColumn()
	id: string;

	@Column({ type: "decimal" })
	amount: number;

	@Column()
	currency: string;

	@Column({ type: "int" })
	created_at_time: number;

	@Column({ type: "int" })
	timestamp: number;

	@Column()
	cause: string;

	@Column()
	full_name: string;

	@Column()
	account_name: string;

	@Column()
	invoice_url: string;
}
