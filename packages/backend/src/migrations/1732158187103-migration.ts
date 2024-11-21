import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1732158187103 implements MigrationInterface {
	name = 'Migration1732158187103';

	public async up(queryRunner: QueryRunner): Promise<void> {
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
			`CREATE TABLE "bookmark" ("id" character varying NOT NULL, "creatorId" character varying NOT NULL, "userId" character varying, "noteId" character varying, "createdAt" character varying NOT NULL, CONSTRAINT "PK_b7fbf4a865ba38a590bb9239814" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`ALTER TABLE "activity" DROP COLUMN "creatorId"`
		);
		await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "userId"`);
		await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "noteId"`);
		await queryRunner.query(
			`ALTER TABLE "bookmark" ADD CONSTRAINT "FK_38b5ffa8154e26c0f3393ac4600" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "bookmark" ADD CONSTRAINT "FK_e389fc192c59bdce0847ef9ef8b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "bookmark" ADD CONSTRAINT "FK_c896ae3f4d0186a1e04f2bc03c6" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "bookmark" DROP CONSTRAINT "FK_c896ae3f4d0186a1e04f2bc03c6"`
		);
		await queryRunner.query(
			`ALTER TABLE "bookmark" DROP CONSTRAINT "FK_e389fc192c59bdce0847ef9ef8b"`
		);
		await queryRunner.query(
			`ALTER TABLE "bookmark" DROP CONSTRAINT "FK_38b5ffa8154e26c0f3393ac4600"`
		);
		await queryRunner.query(
			`ALTER TABLE "activity" ADD "noteId" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "activity" ADD "userId" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "activity" ADD "creatorId" character varying NOT NULL`
		);
		await queryRunner.query(`DROP TABLE "bookmark"`);
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
}
