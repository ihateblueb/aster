import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1738525561927 implements MigrationInterface {
	name = 'Migration1738525561927';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note_react" DROP CONSTRAINT "FK_ae2f6485fe6a8503c398f896e31"`
		);
		await queryRunner.query(
			`ALTER TABLE "emoji" DROP CONSTRAINT "PK_6774cf4d038723353237624669d"`
		);
		await queryRunner.query(
			`ALTER TABLE "emoji" ADD CONSTRAINT "PK_d4a18d55b92d4303427abbf0e81" PRIMARY KEY ("id", "shortcode", "host")`
		);
		await queryRunner.query(
			`ALTER TABLE "emoji" DROP CONSTRAINT "PK_d4a18d55b92d4303427abbf0e81"`
		);
		await queryRunner.query(
			`ALTER TABLE "emoji" ADD CONSTRAINT "PK_402351aff4b73cb0076e1cc6fb1" PRIMARY KEY ("id", "host")`
		);
		await queryRunner.query(
			`ALTER TABLE "emoji" DROP CONSTRAINT "PK_402351aff4b73cb0076e1cc6fb1"`
		);
		await queryRunner.query(
			`ALTER TABLE "emoji" ADD CONSTRAINT "PK_df74ce05e24999ee01ea0bc50a3" PRIMARY KEY ("id")`
		);
		await queryRunner.query(
			`ALTER TABLE "note_react" ADD CONSTRAINT "FK_484892c1c9bbf117892cd92b017" FOREIGN KEY ("emojiId") REFERENCES "emoji"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note_react" DROP CONSTRAINT "FK_484892c1c9bbf117892cd92b017"`
		);
		await queryRunner.query(
			`ALTER TABLE "emoji" DROP CONSTRAINT "PK_df74ce05e24999ee01ea0bc50a3"`
		);
		await queryRunner.query(
			`ALTER TABLE "emoji" ADD CONSTRAINT "PK_402351aff4b73cb0076e1cc6fb1" PRIMARY KEY ("id", "host")`
		);
		await queryRunner.query(
			`ALTER TABLE "emoji" DROP CONSTRAINT "PK_402351aff4b73cb0076e1cc6fb1"`
		);
		await queryRunner.query(
			`ALTER TABLE "emoji" ADD CONSTRAINT "PK_d4a18d55b92d4303427abbf0e81" PRIMARY KEY ("id", "shortcode", "host")`
		);
		await queryRunner.query(
			`ALTER TABLE "emoji" DROP CONSTRAINT "PK_d4a18d55b92d4303427abbf0e81"`
		);
		await queryRunner.query(
			`ALTER TABLE "emoji" ADD CONSTRAINT "PK_6774cf4d038723353237624669d" PRIMARY KEY ("id", "apId", "shortcode", "host")`
		);
		await queryRunner.query(
			`ALTER TABLE "note_react" ADD CONSTRAINT "FK_ae2f6485fe6a8503c398f896e31" FOREIGN KEY ("emojiId", "emojiId", "emojiId", "emojiId") REFERENCES "emoji"("id","apId","shortcode","host") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
	}
}
