import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1734712565967 implements MigrationInterface {
	name = 'Migration1734712565967';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "emoji" DROP CONSTRAINT "FK_c8a310df925c42dd4f296437e76"`
		);
		await queryRunner.query(
			`ALTER TABLE "emoji" RENAME COLUMN "driveFileId" TO "fileId"`
		);
		await queryRunner.query(
			`ALTER TABLE "invite" ADD CONSTRAINT "UQ_c1516376b39ebdd135b255a0a35" UNIQUE ("invite")`
		);
		await queryRunner.query(
			`ALTER TABLE "emoji" ADD CONSTRAINT "FK_6606c5938dd47d90d75a38a46f0" FOREIGN KEY ("fileId") REFERENCES "drive_file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "emoji" DROP CONSTRAINT "FK_6606c5938dd47d90d75a38a46f0"`
		);
		await queryRunner.query(
			`ALTER TABLE "invite" DROP CONSTRAINT "UQ_c1516376b39ebdd135b255a0a35"`
		);
		await queryRunner.query(
			`ALTER TABLE "emoji" RENAME COLUMN "fileId" TO "driveFileId"`
		);
		await queryRunner.query(
			`ALTER TABLE "emoji" ADD CONSTRAINT "FK_c8a310df925c42dd4f296437e76" FOREIGN KEY ("driveFileId") REFERENCES "drive_file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
	}
}
