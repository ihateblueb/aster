import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStuff1717423572218 implements MigrationInterface {
	name = 'AddStuff1717423572218';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "users_auth" ADD "used_at" text array`
		);
		await queryRunner.query(
			`ALTER TABLE "users_pref" ADD "prefs" text array`
		);
		await queryRunner.query(
			`ALTER TABLE "meta" ADD "local_user_count" integer`
		);
		await queryRunner.query(
			`ALTER TABLE "meta" ADD "total_user_count" integer`
		);
		await queryRunner.query(
			`ALTER TABLE "meta" ADD "local_note_count" integer`
		);
		await queryRunner.query(
			`ALTER TABLE "meta" ADD "total__count" integer`
		);
		await queryRunner.query(
			`ALTER TABLE "meta" ADD "instance_count" integer`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "meta" DROP COLUMN "instance_count"`
		);
		await queryRunner.query(
			`ALTER TABLE "meta" DROP COLUMN "total__count"`
		);
		await queryRunner.query(
			`ALTER TABLE "meta" DROP COLUMN "local_note_count"`
		);
		await queryRunner.query(
			`ALTER TABLE "meta" DROP COLUMN "total_user_count"`
		);
		await queryRunner.query(
			`ALTER TABLE "meta" DROP COLUMN "local_user_count"`
		);
		await queryRunner.query(`ALTER TABLE "users_pref" DROP COLUMN "prefs"`);
		await queryRunner.query(
			`ALTER TABLE "users_auth" DROP COLUMN "used_at"`
		);
	}
}
