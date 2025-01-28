import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1738039700595 implements MigrationInterface {
	name = 'Migration1738039700595';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note_react" ALTER COLUMN "content" DROP NOT NULL`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note_react" ALTER COLUMN "content" SET NOT NULL`
		);
	}
}
