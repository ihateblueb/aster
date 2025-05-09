import { MigrationInterface, QueryRunner } from 'typeorm';

export class DoesThisFixAnything1728718181200 implements MigrationInterface {
	name = 'DoesThisFixAnything1728718181200';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note" DROP CONSTRAINT "FK_5b87d9d19127bd5d92026017a7b"`
		);
		await queryRunner.query(
			`ALTER TABLE "note" ADD CONSTRAINT "UQ_5b87d9d19127bd5d92026017a7b" UNIQUE ("userId")`
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
			`ALTER TABLE "note" DROP CONSTRAINT "UQ_5b87d9d19127bd5d92026017a7b"`
		);
		await queryRunner.query(
			`ALTER TABLE "note" ADD CONSTRAINT "FK_5b87d9d19127bd5d92026017a7b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}
}
