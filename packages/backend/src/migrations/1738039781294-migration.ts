import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1738039781294 implements MigrationInterface {
	name = 'Migration1738039781294';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "reactionIds"`);
		await queryRunner.query(
			`ALTER TABLE "note_react" ADD "apId" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "note_react" ADD CONSTRAINT "UQ_4cad336ebe28964a7bb7d5772c4" UNIQUE ("apId")`
		);
		await queryRunner.query(
			`ALTER TABLE "note_react" ADD "userId" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "note_react" ADD "emojiId" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "note_react" ADD "content" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "note_react" ADD "noteId" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "note_react" ADD CONSTRAINT "UQ_0661edae8befa45f9e12d16e204" UNIQUE ("noteId")`
		);
		await queryRunner.query(
			`ALTER TABLE "note_react" ADD "createdAt" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "note_react" ADD CONSTRAINT "FK_35b1a60a5d2339f0ee2ade56ca7" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "note_react" ADD CONSTRAINT "FK_ae2f6485fe6a8503c398f896e31" FOREIGN KEY ("emojiId", "emojiId", "emojiId", "emojiId") REFERENCES "emoji"("id","apId","shortcode","host") ON DELETE CASCADE ON UPDATE NO ACTION`
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
			`ALTER TABLE "note_react" DROP CONSTRAINT "FK_ae2f6485fe6a8503c398f896e31"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_react" DROP CONSTRAINT "FK_35b1a60a5d2339f0ee2ade56ca7"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_react" DROP COLUMN "createdAt"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_react" DROP CONSTRAINT "UQ_0661edae8befa45f9e12d16e204"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_react" DROP COLUMN "noteId"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_react" DROP COLUMN "content"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_react" DROP COLUMN "emojiId"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_react" DROP COLUMN "userId"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_react" DROP CONSTRAINT "UQ_4cad336ebe28964a7bb7d5772c4"`
		);
		await queryRunner.query(`ALTER TABLE "note_react" DROP COLUMN "apId"`);
		await queryRunner.query(
			`ALTER TABLE "note" ADD "reactionIds" character varying array`
		);
	}
}
