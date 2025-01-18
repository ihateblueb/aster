import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1736827960879 implements MigrationInterface {
	name = 'Migration1736827960879';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "drive_file" DROP CONSTRAINT "FK_860fa6f6c7df5bb887249fba22e"`
		);
		await queryRunner.query(
			`CREATE TABLE "mood" ("id" character varying NOT NULL, "apId" character varying NOT NULL, "userId" character varying NOT NULL, "content" character varying NOT NULL, "visibility" character varying NOT NULL, "createdAt" character varying NOT NULL, "expiresAt" character varying NOT NULL, CONSTRAINT "PK_cd069bf46deedf0ef3a7771f44b" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`ALTER TABLE "drive_file" DROP COLUMN "userId"`
		);
		await queryRunner.query(
			`ALTER TABLE "note" ADD "attachmentsId" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "report" ADD "resolved" boolean NOT NULL DEFAULT false`
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
			`ALTER TABLE "mood" ADD CONSTRAINT "FK_063b678cbb2c84dfd95dff5da22" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "note" ADD CONSTRAINT "FK_626c0c772a0a953a43f6ad7fdd0" FOREIGN KEY ("attachmentsId") REFERENCES "drive_file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
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
			`ALTER TABLE "note" DROP CONSTRAINT "FK_626c0c772a0a953a43f6ad7fdd0"`
		);
		await queryRunner.query(
			`ALTER TABLE "mood" DROP CONSTRAINT "FK_063b678cbb2c84dfd95dff5da22"`
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
		await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "resolved"`);
		await queryRunner.query(
			`ALTER TABLE "note" DROP COLUMN "attachmentsId"`
		);
		await queryRunner.query(
			`ALTER TABLE "drive_file" ADD "userId" character varying`
		);
		await queryRunner.query(`DROP TABLE "mood"`);
		await queryRunner.query(
			`ALTER TABLE "drive_file" ADD CONSTRAINT "FK_860fa6f6c7df5bb887249fba22e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
	}
}
