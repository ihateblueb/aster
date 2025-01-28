import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1738041769580 implements MigrationInterface {
	name = 'Migration1738041769580';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note_react" DROP CONSTRAINT "FK_0661edae8befa45f9e12d16e204"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_react" DROP CONSTRAINT "UQ_0661edae8befa45f9e12d16e204"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_react" ADD CONSTRAINT "FK_0661edae8befa45f9e12d16e204" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note_react" DROP CONSTRAINT "FK_0661edae8befa45f9e12d16e204"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_react" ADD CONSTRAINT "UQ_0661edae8befa45f9e12d16e204" UNIQUE ("noteId")`
		);
		await queryRunner.query(
			`ALTER TABLE "note_react" ADD CONSTRAINT "FK_0661edae8befa45f9e12d16e204" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
	}
}
