import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1738722516728 implements MigrationInterface {
	name = 'Migration1738722516728';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "emoji" ALTER COLUMN "host" DROP NOT NULL`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "emoji" ALTER COLUMN "host" SET NOT NULL`
		);
	}
}
