import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAdsAndSuch1717960736078 implements MigrationInterface {
	name = 'AddAdsAndSuch1717960736078';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "ads" ("id" character varying NOT NULL, "created_at" character varying, "expire_at" character varying, "url" character varying, "alt" character varying, "link" character varying, "comment" character varying, CONSTRAINT "PK_a7af7d1998037a97076f758fc23" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`ALTER TABLE "users" ADD "total_notes" integer`
		);
		await queryRunner.query(
			`ALTER TABLE "users" ADD "total_followers" integer`
		);
		await queryRunner.query(
			`ALTER TABLE "users" ADD "total_following" integer`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "users" DROP COLUMN "total_following"`
		);
		await queryRunner.query(
			`ALTER TABLE "users" DROP COLUMN "total_followers"`
		);
		await queryRunner.query(
			`ALTER TABLE "users" DROP COLUMN "total_notes"`
		);
		await queryRunner.query(`DROP TABLE "ads"`);
	}
}
