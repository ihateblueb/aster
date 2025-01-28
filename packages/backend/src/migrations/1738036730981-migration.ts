import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1738036730981 implements MigrationInterface {
	name = 'Migration1738036730981';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note_react" DROP CONSTRAINT "FK_7e016590b35222970defdc8c004"`
		);
		await queryRunner.query(`ALTER TABLE "note_react" DROP COLUMN "Emoji"`);
		await queryRunner.query(
			`ALTER TABLE "note_react" ADD CONSTRAINT "FK_ae2f6485fe6a8503c398f896e31" FOREIGN KEY ("emojiId", "emojiId", "emojiId", "emojiId") REFERENCES "emoji"("id","apId","shortcode","host") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note_react" DROP CONSTRAINT "FK_ae2f6485fe6a8503c398f896e31"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_react" ADD "Emoji" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "note_react" ADD CONSTRAINT "FK_7e016590b35222970defdc8c004" FOREIGN KEY ("Emoji", "Emoji", "Emoji", "Emoji") REFERENCES "emoji"("id","apId","shortcode","host") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
	}
}
