import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddApFollowerFollowingUrls1716649190085
	implements MigrationInterface
{
	name = 'AddApFollowerFollowingUrls1716649190085';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "users" ADD "following_url" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "users" ADD "followers_url" character varying`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "users" DROP COLUMN "followers_url"`
		);
		await queryRunner.query(
			`ALTER TABLE "users" DROP COLUMN "following_url"`
		);
	}
}
