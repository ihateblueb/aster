import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeCwNullable1728715043129 implements MigrationInterface {
	name = 'MakeCwNullable1728715043129';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note" ALTER COLUMN "cw" DROP NOT NULL`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note" ALTER COLUMN "cw" SET NOT NULL`
		);
	}
}
