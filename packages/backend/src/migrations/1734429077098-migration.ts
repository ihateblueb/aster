import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1734429077098 implements MigrationInterface {
	name = 'Migration1734429077098';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note" RENAME COLUMN "driveFileIds" TO "attachmentIds"`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note" RENAME COLUMN "attachmentIds" TO "driveFileIds"`
		);
	}
}
