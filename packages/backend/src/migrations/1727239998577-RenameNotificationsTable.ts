import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameNotificationsTable1727239998577
	implements MigrationInterface
{
	name = 'RenameNotificationsTable1727239998577';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "notification" ("id" character varying NOT NULL, "to" character varying NOT NULL, "from" character varying NOT NULL, "type" character varying NOT NULL, "created_at" character varying, "object" character varying, "reaction" character varying, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "notification"`);
	}
}
