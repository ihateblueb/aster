import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1745944562058 implements MigrationInterface {
	name = 'Migration1745944562058';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "notification" ADD "reportId" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "notification" ADD CONSTRAINT "FK_bac6339b4911a61bd74d64f8a0b" FOREIGN KEY ("reportId") REFERENCES "report"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "notification" DROP CONSTRAINT "FK_bac6339b4911a61bd74d64f8a0b"`
		);
		await queryRunner.query(
			`ALTER TABLE "notification" DROP COLUMN "reportId"`
		);
	}
}
