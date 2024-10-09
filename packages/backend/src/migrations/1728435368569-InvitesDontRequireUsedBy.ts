import { MigrationInterface, QueryRunner } from 'typeorm';

export class InvitesDontRequireUsedBy1728435368569
	implements MigrationInterface
{
	name = 'InvitesDontRequireUsedBy1728435368569';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "invite" ALTER COLUMN "usedBy" DROP NOT NULL`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "invite" ALTER COLUMN "usedBy" SET NOT NULL`
		);
	}
}
