import { MigrationInterface, QueryRunner } from 'typeorm';

export class Ugh61728744528731 implements MigrationInterface {
	name = 'Ugh61728744528731';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note" DROP CONSTRAINT "FK_dd31e8dea0de8f619c93095cec4"`
		);
		await queryRunner.query(
			`ALTER TABLE "note" DROP CONSTRAINT "UQ_dd31e8dea0de8f619c93095cec4"`
		);
		await queryRunner.query(
			`ALTER TABLE "note" ADD CONSTRAINT "FK_dd31e8dea0de8f619c93095cec4" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note" DROP CONSTRAINT "FK_dd31e8dea0de8f619c93095cec4"`
		);
		await queryRunner.query(
			`ALTER TABLE "note" ADD CONSTRAINT "UQ_dd31e8dea0de8f619c93095cec4" UNIQUE ("user")`
		);
		await queryRunner.query(
			`ALTER TABLE "note" ADD CONSTRAINT "FK_dd31e8dea0de8f619c93095cec4" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}
}
