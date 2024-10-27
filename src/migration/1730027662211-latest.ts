import { MigrationInterface, QueryRunner } from "typeorm";

export class Latest1730027662211 implements MigrationInterface {
    name = 'Latest1730027662211'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" numeric NOT NULL, "currency" character varying NOT NULL, "created_at_time" integer NOT NULL, "timestamp" integer NOT NULL, "cause" character varying NOT NULL, "full_name" character varying NOT NULL, "account_name" character varying NOT NULL, "invoice_url" character varying NOT NULL, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "transaction"`);
    }

}
