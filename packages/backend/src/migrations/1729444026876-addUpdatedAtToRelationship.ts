import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUpdatedAtToRelationship1729444026876
	implements MigrationInterface
{
	name = 'AddUpdatedAtToRelationship1729444026876';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note_like" DROP CONSTRAINT "FK_26ac46b4ef390acf65431b13e4f"`
		);
		await queryRunner.query(
			`ALTER TABLE "activity" DROP CONSTRAINT "FK_4ec8340b89b02ddf342e770e4ec"`
		);
		await queryRunner.query(
			`ALTER TABLE "activity" DROP CONSTRAINT "FK_3571467bcbe021f66e2bdce96ea"`
		);
		await queryRunner.query(
			`ALTER TABLE "activity" DROP CONSTRAINT "FK_29daa447591139b74774c12e5a7"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_like" DROP COLUMN "emojiId"`
		);
		await queryRunner.query(`ALTER TABLE "note_like" DROP COLUMN "Emoji"`);
		await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "apId"`);
		await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "content"`);
		await queryRunner.query(
			`ALTER TABLE "activity" DROP COLUMN "creatorId"`
		);
		await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "userId"`);
		await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "noteId"`);
		await queryRunner.query(
			`ALTER TABLE "note_like" ADD "emojiId" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "note_like" ADD "Emoji" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "activity" ADD "creatorId" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "activity" ADD "userId" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "activity" ADD "noteId" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "activity" ADD "apId" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "activity" ADD "content" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "relationship" ADD "updatedAt" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "note_like" ADD CONSTRAINT "FK_26ac46b4ef390acf65431b13e4f" FOREIGN KEY ("Emoji") REFERENCES "emoji"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "activity" ADD CONSTRAINT "FK_4ec8340b89b02ddf342e770e4ec" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "activity" ADD CONSTRAINT "FK_3571467bcbe021f66e2bdce96ea" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "activity" ADD CONSTRAINT "FK_29daa447591139b74774c12e5a7" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "activity" DROP CONSTRAINT "FK_29daa447591139b74774c12e5a7"`
		);
		await queryRunner.query(
			`ALTER TABLE "activity" DROP CONSTRAINT "FK_3571467bcbe021f66e2bdce96ea"`
		);
		await queryRunner.query(
			`ALTER TABLE "activity" DROP CONSTRAINT "FK_4ec8340b89b02ddf342e770e4ec"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_like" DROP CONSTRAINT "FK_26ac46b4ef390acf65431b13e4f"`
		);
		await queryRunner.query(
			`ALTER TABLE "relationship" DROP COLUMN "updatedAt"`
		);
		await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "content"`);
		await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "apId"`);
		await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "noteId"`);
		await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "userId"`);
		await queryRunner.query(
			`ALTER TABLE "activity" DROP COLUMN "creatorId"`
		);
		await queryRunner.query(`ALTER TABLE "note_like" DROP COLUMN "Emoji"`);
		await queryRunner.query(
			`ALTER TABLE "note_like" DROP COLUMN "emojiId"`
		);
		await queryRunner.query(
			`ALTER TABLE "activity" ADD "noteId" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "activity" ADD "userId" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "activity" ADD "creatorId" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "activity" ADD "content" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "activity" ADD "apId" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "note_like" ADD "Emoji" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "note_like" ADD "emojiId" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "activity" ADD CONSTRAINT "FK_29daa447591139b74774c12e5a7" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "activity" ADD CONSTRAINT "FK_3571467bcbe021f66e2bdce96ea" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "activity" ADD CONSTRAINT "FK_4ec8340b89b02ddf342e770e4ec" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "note_like" ADD CONSTRAINT "FK_26ac46b4ef390acf65431b13e4f" FOREIGN KEY ("Emoji") REFERENCES "emoji"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
	}
}
