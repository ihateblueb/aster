import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1733777073378 implements MigrationInterface {
	name = 'Migrations1733777073378';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note" ALTER COLUMN "content" DROP NOT NULL`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note" ALTER COLUMN "content" SET NOT NULL`
		);
	}
}
