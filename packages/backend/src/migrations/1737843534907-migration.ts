import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1737843534907 implements MigrationInterface {
	name = 'Migration1737843534907';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "user" ADD "emojis" character varying array`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "emojis"`);
	}
}
