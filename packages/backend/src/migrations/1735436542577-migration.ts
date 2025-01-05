import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1735436542577 implements MigrationInterface {
	name = 'Migration1735436542577';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "user" ALTER COLUMN "inbox" SET NOT NULL`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "user" ALTER COLUMN "inbox" DROP NOT NULL`
		);
	}
}
