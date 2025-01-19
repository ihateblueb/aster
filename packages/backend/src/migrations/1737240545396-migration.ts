import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1737240545396 implements MigrationInterface {
	name = 'Migration1737240545396';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "drive_file" ADD "userId" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "drive_file" ADD CONSTRAINT "FK_860fa6f6c7df5bb887249fba22e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "drive_file" DROP CONSTRAINT "FK_860fa6f6c7df5bb887249fba22e"`
		);
		await queryRunner.query(
			`ALTER TABLE "drive_file" DROP COLUMN "userId"`
		);
	}
}
