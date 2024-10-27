import { MigrationInterface, QueryRunner } from "typeorm";

export class Latest1730029129971 implements MigrationInterface {
    name = 'Latest1730029129971'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id")`);
    }

}
