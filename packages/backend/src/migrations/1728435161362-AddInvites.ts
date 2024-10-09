import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddInvites1728435161362 implements MigrationInterface {
	name = 'AddInvites1728435161362';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "user" RENAME COLUMN "deactivated" TO "activated"`
		);
		await queryRunner.query(
			`CREATE TABLE "invite" ("id" character varying NOT NULL, "creator" character varying NOT NULL, "createdAt" character varying NOT NULL, "usedBy" character varying NOT NULL, "invite" character varying NOT NULL, CONSTRAINT "PK_fc9fa190e5a3c5d80604a4f63e1" PRIMARY KEY ("id"))`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "invite"`);
		await queryRunner.query(
			`ALTER TABLE "user" RENAME COLUMN "activated" TO "deactivated"`
		);
	}
}
