import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1737316039879 implements MigrationInterface {
	name = 'Migration1737316039879';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP CONSTRAINT "FK_cbbbcdc5cf6e96561145f77941c"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP CONSTRAINT "FK_dd60d4adc8e73b7ae339ba9beb1"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD CONSTRAINT "FK_cbbbcdc5cf6e96561145f77941c" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD CONSTRAINT "FK_dd60d4adc8e73b7ae339ba9beb1" FOREIGN KEY ("driveFileId") REFERENCES "drive_file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP CONSTRAINT "FK_dd60d4adc8e73b7ae339ba9beb1"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP CONSTRAINT "FK_cbbbcdc5cf6e96561145f77941c"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD CONSTRAINT "FK_dd60d4adc8e73b7ae339ba9beb1" FOREIGN KEY ("driveFileId") REFERENCES "drive_file"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD CONSTRAINT "FK_cbbbcdc5cf6e96561145f77941c" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
	}
}
