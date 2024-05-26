import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserAuth1716683237104 implements MigrationInterface {
	name = 'AddUserAuth1716683237104';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "users_auth" ("id" character varying NOT NULL, "expires" character varying, "token" character varying, CONSTRAINT "PK_32ddc1ae708e8261a870a6eb3e6" PRIMARY KEY ("id"))`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "users_auth"`);
	}
}
