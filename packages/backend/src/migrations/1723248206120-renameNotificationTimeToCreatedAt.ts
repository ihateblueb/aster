import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameNotificationTimeToCreatedAt1723248206120
	implements MigrationInterface
{
	name = 'RenameNotificationTimeToCreatedAt1723248206120';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "user_notification" RENAME COLUMN "time" TO "created_at"`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "user_notification" RENAME COLUMN "created_at" TO "time"`
		);
	}
}
