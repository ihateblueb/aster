import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1733665405105 implements MigrationInterface {
	name = 'Migration1733665405105';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "auth" RENAME COLUMN "user" TO "userId"`
		);
		await queryRunner.query(
			`ALTER TABLE "auth" ADD CONSTRAINT "FK_373ead146f110f04dad60848154" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "auth" DROP CONSTRAINT "FK_373ead146f110f04dad60848154"`
		);
		await queryRunner.query(
			`ALTER TABLE "auth" RENAME COLUMN "userId" TO "user"`
		);
	}
}
