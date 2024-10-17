import { MigrationInterface, QueryRunner } from 'typeorm';

export class Ugh141728750307792 implements MigrationInterface {
	name = 'Ugh141728750307792';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note" DROP CONSTRAINT "FK_5b87d9d19127bd5d92026017a7b"`
		);
		await queryRunner.query(
			`ALTER TABLE "note" ALTER COLUMN "userId" SET NOT NULL`
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
			`ALTER TABLE "note" ALTER COLUMN "userId" DROP NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "note" ADD CONSTRAINT "FK_5b87d9d19127bd5d92026017a7b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}
}
