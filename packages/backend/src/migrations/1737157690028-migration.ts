import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1737157690028 implements MigrationInterface {
	name = 'Migration1737157690028';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "meta" DROP CONSTRAINT "PK_c4c17a6c2bd7651338b60fc590b"`
		);
		await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "id"`);
		await queryRunner.query(
			`ALTER TABLE "meta" ADD "maintainer" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "meta" ADD "maintainerEmail" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "meta" ADD CONSTRAINT "PK_c6e1256d497c85128f622952708" PRIMARY KEY ("name")`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "meta" DROP CONSTRAINT "PK_c6e1256d497c85128f622952708"`
		);
		await queryRunner.query(
			`ALTER TABLE "meta" DROP COLUMN "maintainerEmail"`
		);
		await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "maintainer"`);
		await queryRunner.query(
			`ALTER TABLE "meta" ADD "id" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "meta" ADD CONSTRAINT "PK_c4c17a6c2bd7651338b60fc590b" PRIMARY KEY ("id")`
		);
	}
}
