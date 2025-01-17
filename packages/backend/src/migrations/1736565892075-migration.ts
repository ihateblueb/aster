import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1736565892075 implements MigrationInterface {
	name = 'Migration1736565892075';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "drive_file" DROP CONSTRAINT "FK_860fa6f6c7df5bb887249fba22e"`
		);
		await queryRunner.query(
			`ALTER TABLE "drive_file" DROP COLUMN "userId"`
		);
		await queryRunner.query(
			`ALTER TABLE "report" DROP CONSTRAINT "FK_e347c56b008c2057c9887e230aa"`
		);
		await queryRunner.query(
			`ALTER TABLE "report" DROP CONSTRAINT "FK_5c07dd4a48586355aff4c6afcac"`
		);
		await queryRunner.query(
			`ALTER TABLE "report" ALTER COLUMN "userId" DROP NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "report" ALTER COLUMN "noteId" DROP NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "report" ADD CONSTRAINT "FK_e347c56b008c2057c9887e230aa" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "report" ADD CONSTRAINT "FK_5c07dd4a48586355aff4c6afcac" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "report" DROP CONSTRAINT "FK_5c07dd4a48586355aff4c6afcac"`
		);
		await queryRunner.query(
			`ALTER TABLE "report" DROP CONSTRAINT "FK_e347c56b008c2057c9887e230aa"`
		);
		await queryRunner.query(
			`ALTER TABLE "report" ALTER COLUMN "noteId" SET NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "report" ALTER COLUMN "userId" SET NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "report" ADD CONSTRAINT "FK_5c07dd4a48586355aff4c6afcac" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "report" ADD CONSTRAINT "FK_e347c56b008c2057c9887e230aa" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "drive_file" ADD "userId" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "drive_file" ADD CONSTRAINT "FK_860fa6f6c7df5bb887249fba22e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
	}
}
