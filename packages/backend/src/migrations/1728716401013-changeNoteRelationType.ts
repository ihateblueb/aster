import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeNoteRelationType1728716401013 implements MigrationInterface {
	name = 'ChangeNoteRelationType1728716401013';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note" DROP CONSTRAINT "FK_5b87d9d19127bd5d92026017a7b"`
		);
		await queryRunner.query(
			`ALTER TABLE "note" DROP CONSTRAINT "REL_5b87d9d19127bd5d92026017a7"`
		);
		await queryRunner.query(
			`ALTER TABLE "note" ADD CONSTRAINT "FK_5b87d9d19127bd5d92026017a7b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note" DROP CONSTRAINT "FK_5b87d9d19127bd5d92026017a7b"`
		);
		await queryRunner.query(
			`ALTER TABLE "note" ADD CONSTRAINT "REL_5b87d9d19127bd5d92026017a7" UNIQUE ("userId")`
		);
		await queryRunner.query(
			`ALTER TABLE "note" ADD CONSTRAINT "FK_5b87d9d19127bd5d92026017a7b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}
}
