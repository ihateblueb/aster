import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1736349475285 implements MigrationInterface {
	name = 'Migration1736349475285';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "user_preferences" ADD "makeLikesPublic" boolean NOT NULL DEFAULT true`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "user_preferences" DROP COLUMN "makeLikesPublic"`
		);
	}
}
