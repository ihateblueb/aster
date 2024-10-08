import { MigrationInterface, QueryRunner } from 'typeorm';

export class ImStupid1728430965477 implements MigrationInterface {
	name = 'ImStupid1728430965477';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "user_private" ("id" character varying NOT NULL, "user" character varying NOT NULL, "password" character varying NOT NULL, "privateKey" character varying NOT NULL, CONSTRAINT "UQ_f267d55932a9b3168c4a9f2ec91" UNIQUE ("user"), CONSTRAINT "PK_e6bf0ac016c44867edaaeeccec3" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`ALTER TABLE "user" DROP CONSTRAINT "UQ_9ec886924bcd97ae6f14220017a"`
		);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "user"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "privateKey"`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "user" ADD "privateKey" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "password" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "user" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD CONSTRAINT "UQ_9ec886924bcd97ae6f14220017a" UNIQUE ("user")`
		);
		await queryRunner.query(`DROP TABLE "user_private"`);
	}
}
