import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1746283447103 implements MigrationInterface {
	name = 'Migration1746283447103';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "meta" ADD "manifestOverride" jsonb`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "meta" DROP COLUMN "manifestOverride"`
		);
	}
}
