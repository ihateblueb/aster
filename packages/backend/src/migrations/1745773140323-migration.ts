import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1745773140323 implements MigrationInterface {
	name = 'Migration1745773140323';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "relationship" DROP CONSTRAINT "FK_236833ba4c72c178bbdd03d096f"`
		);
		await queryRunner.query(
			`ALTER TABLE "relationship" DROP CONSTRAINT "UQ_236833ba4c72c178bbdd03d096f"`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "relationship" ADD CONSTRAINT "UQ_236833ba4c72c178bbdd03d096f" UNIQUE ("activityForResponseId")`
		);
		await queryRunner.query(
			`ALTER TABLE "relationship" ADD CONSTRAINT "FK_236833ba4c72c178bbdd03d096f" FOREIGN KEY ("activityForResponseId") REFERENCES "activity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
	}
}
