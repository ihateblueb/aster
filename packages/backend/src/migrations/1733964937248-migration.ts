import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1733964937248 implements MigrationInterface {
	name = 'Migration1733964937248';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note" ADD "nsleft" integer NOT NULL DEFAULT '1'`
		);
		await queryRunner.query(
			`ALTER TABLE "note" ADD "nsright" integer NOT NULL DEFAULT '2'`
		);
		await queryRunner.query(
			`ALTER TABLE "note" ADD "replyingToIdId" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "note" ADD CONSTRAINT "FK_6c65c7c559c24751b791054b14e" FOREIGN KEY ("replyingToIdId") REFERENCES "note"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note" DROP CONSTRAINT "FK_6c65c7c559c24751b791054b14e"`
		);
		await queryRunner.query(
			`ALTER TABLE "note" DROP COLUMN "replyingToIdId"`
		);
		await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "nsright"`);
		await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "nsleft"`);
	}
}
