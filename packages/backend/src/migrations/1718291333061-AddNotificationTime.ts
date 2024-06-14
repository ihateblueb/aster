import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNotificationTime1718291333061 implements MigrationInterface {
	name = 'AddNotificationTime1718291333061';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "users_notification" ADD "time" character varying`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "users_notification" DROP COLUMN "time"`
		);
	}
}
