import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserMetadata1717604775155 implements MigrationInterface {
	name = 'AddUserMetadata1717604775155';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "users" ADD "metadata" text array`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "metadata"`);
	}
}
