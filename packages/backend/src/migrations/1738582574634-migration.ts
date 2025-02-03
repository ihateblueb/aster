import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1738582574634 implements MigrationInterface {
	name = 'Migration1738582574634';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "emoji" ADD "category" character varying`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "emoji" DROP COLUMN "category"`);
	}
}
