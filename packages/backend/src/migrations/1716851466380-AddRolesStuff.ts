import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRolesStuff1716851466380 implements MigrationInterface {
	name = 'AddRolesStuff1716851466380';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "users_pref" ("id" character varying NOT NULL, CONSTRAINT "PK_dca6d286f39876407ede7884a72" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "roles" ("id" character varying NOT NULL, "name" character varying NOT NULL, "color" character varying, "users" text array, "permissions" text array, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(`ALTER TABLE "users" ADD "roles" text array`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roles"`);
		await queryRunner.query(`DROP TABLE "roles"`);
		await queryRunner.query(`DROP TABLE "users_pref"`);
	}
}
