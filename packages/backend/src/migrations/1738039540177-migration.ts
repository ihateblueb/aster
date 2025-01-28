import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1738039540177 implements MigrationInterface {
	name = 'Migration1738039540177';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note_react" ADD "userId" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "note_react" ADD "emojiId" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "note_react" ADD CONSTRAINT "FK_35b1a60a5d2339f0ee2ade56ca7" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "note_react" ADD CONSTRAINT "FK_ae2f6485fe6a8503c398f896e31" FOREIGN KEY ("emojiId", "emojiId", "emojiId", "emojiId") REFERENCES "emoji"("id","apId","shortcode","host") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note_react" DROP CONSTRAINT "FK_ae2f6485fe6a8503c398f896e31"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_react" DROP CONSTRAINT "FK_35b1a60a5d2339f0ee2ade56ca7"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_react" DROP COLUMN "emojiId"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_react" DROP COLUMN "userId"`
		);
	}
}
