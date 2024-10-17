import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1729156906165 implements MigrationInterface {
	name = 'Migration1729156906165';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note" DROP CONSTRAINT "FK_5b87d9d19127bd5d92026017a7b"`
		);
		await queryRunner.query(
			`ALTER TABLE "note" DROP CONSTRAINT "FK_74d4e4017198657d73a3b3d864d"`
		);
		await queryRunner.query(
			`CREATE TABLE "poll" ("id" character varying NOT NULL, "noteId" character varying NOT NULL, "key" character varying array NOT NULL, "value" character varying array NOT NULL, "correctness" character varying array, CONSTRAINT "PK_03b5cf19a7f562b231c3458527e" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "note_like" ("id" character varying NOT NULL, "userId" character varying NOT NULL, "noteId" character varying NOT NULL, "createdAt" character varying NOT NULL, CONSTRAINT "REL_8dc185ad3ae7fc6e49dbf66abe" UNIQUE ("noteId"), CONSTRAINT "PK_dcb2c1593ba4264ea3954fa605e" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "moderated_instance" ("id" character varying NOT NULL, "host" character varying NOT NULL, "cw" character varying, "sensitive" boolean NOT NULL DEFAULT false, "suspend" boolean NOT NULL DEFAULT false, "silence" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_0519d349186e8d527ad831ea18b" UNIQUE ("host"), CONSTRAINT "PK_9ea53bb754447cba5bd85493aad" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "drive_file" ("id" character varying NOT NULL, "userId" character varying NOT NULL, "type" character varying NOT NULL, "width" integer DEFAULT '0', "height" integer DEFAULT '0', "sensitive" boolean NOT NULL DEFAULT false, "alt" character varying NOT NULL, "src" character varying NOT NULL, "createdAt" character varying NOT NULL, "updatedAt" character varying NOT NULL, CONSTRAINT "PK_43ddaaaf18c9e68029b7cbb032e" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "emoji" ("id" character varying NOT NULL, "driveFileId" character varying NOT NULL, "createdAt" character varying NOT NULL, CONSTRAINT "REL_c8a310df925c42dd4f296437e7" UNIQUE ("driveFileId"), CONSTRAINT "PK_df74ce05e24999ee01ea0bc50a3" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "activity" ("id" character varying NOT NULL, "creatorId" character varying NOT NULL, "userId" character varying NOT NULL, "noteId" character varying NOT NULL, "createdAt" character varying NOT NULL, CONSTRAINT "PK_24625a1d6b1b089c8ae206fe467" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "instance" ("id" character varying NOT NULL, "host" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying, "software" character varying, "version" character varying, "maintainer" character varying, "maintainerEmail" character varying, CONSTRAINT "UQ_8d5afc98982185799b160e10ebe" UNIQUE ("host"), CONSTRAINT "PK_eaf60e4a0c399c9935413e06474" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "metadata"`);
		await queryRunner.query(
			`ALTER TABLE "activity" DROP COLUMN "creatorId"`
		);
		await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "userId"`);
		await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "noteId"`);
		await queryRunner.query(
			`ALTER TABLE "notification" DROP COLUMN "object"`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "metadataKeys" character varying array`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "metadataValues" character varying array`
		);
		await queryRunner.query(
			`ALTER TABLE "note" ADD "pollId" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "note" ADD CONSTRAINT "UQ_f5e9d69f538e3064206c4338338" UNIQUE ("pollId")`
		);
		await queryRunner.query(
			`ALTER TABLE "note" ADD "updatedAt" character varying`
		);
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
			`ALTER TABLE "relationship" ADD "responseActivityId" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "relationship" ADD CONSTRAINT "UQ_9547682b151a8d9ee40039aaea3" UNIQUE ("responseActivityId")`
		);
		await queryRunner.query(
			`ALTER TABLE "notification" ADD "noteId" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "notification" ADD "userId" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "notification" ADD "relationshipId" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "note" ADD CONSTRAINT "FK_5b87d9d19127bd5d92026017a7b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "note" ADD CONSTRAINT "FK_74d4e4017198657d73a3b3d864d" FOREIGN KEY ("replyingToId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "note" ADD CONSTRAINT "FK_f5e9d69f538e3064206c4338338" FOREIGN KEY ("pollId") REFERENCES "poll"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "poll" ADD CONSTRAINT "FK_da851e06d0dfe2ef397d8b1bf1b" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "note_like" ADD CONSTRAINT "FK_2727c369f95e439cf655c14df34" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "note_like" ADD CONSTRAINT "FK_8dc185ad3ae7fc6e49dbf66abef" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "drive_file" ADD CONSTRAINT "FK_860fa6f6c7df5bb887249fba22e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "emoji" ADD CONSTRAINT "FK_c8a310df925c42dd4f296437e76" FOREIGN KEY ("driveFileId") REFERENCES "drive_file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
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
		await queryRunner.query(
			`ALTER TABLE "relationship" ADD CONSTRAINT "FK_9547682b151a8d9ee40039aaea3" FOREIGN KEY ("responseActivityId") REFERENCES "activity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "notification" ADD CONSTRAINT "FK_769cb6b73a1efe22ddf733ac453" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "notification" ADD CONSTRAINT "FK_1ced25315eb974b73391fb1c81b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "notification" ADD CONSTRAINT "FK_e51bca2e861b8032a2851f4253f" FOREIGN KEY ("relationshipId") REFERENCES "relationship"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "notification" DROP CONSTRAINT "FK_e51bca2e861b8032a2851f4253f"`
		);
		await queryRunner.query(
			`ALTER TABLE "notification" DROP CONSTRAINT "FK_1ced25315eb974b73391fb1c81b"`
		);
		await queryRunner.query(
			`ALTER TABLE "notification" DROP CONSTRAINT "FK_769cb6b73a1efe22ddf733ac453"`
		);
		await queryRunner.query(
			`ALTER TABLE "relationship" DROP CONSTRAINT "FK_9547682b151a8d9ee40039aaea3"`
		);
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
			`ALTER TABLE "emoji" DROP CONSTRAINT "FK_c8a310df925c42dd4f296437e76"`
		);
		await queryRunner.query(
			`ALTER TABLE "drive_file" DROP CONSTRAINT "FK_860fa6f6c7df5bb887249fba22e"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_like" DROP CONSTRAINT "FK_8dc185ad3ae7fc6e49dbf66abef"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_like" DROP CONSTRAINT "FK_2727c369f95e439cf655c14df34"`
		);
		await queryRunner.query(
			`ALTER TABLE "poll" DROP CONSTRAINT "FK_da851e06d0dfe2ef397d8b1bf1b"`
		);
		await queryRunner.query(
			`ALTER TABLE "note" DROP CONSTRAINT "FK_f5e9d69f538e3064206c4338338"`
		);
		await queryRunner.query(
			`ALTER TABLE "note" DROP CONSTRAINT "FK_74d4e4017198657d73a3b3d864d"`
		);
		await queryRunner.query(
			`ALTER TABLE "note" DROP CONSTRAINT "FK_5b87d9d19127bd5d92026017a7b"`
		);
		await queryRunner.query(
			`ALTER TABLE "notification" DROP COLUMN "relationshipId"`
		);
		await queryRunner.query(
			`ALTER TABLE "notification" DROP COLUMN "userId"`
		);
		await queryRunner.query(
			`ALTER TABLE "notification" DROP COLUMN "noteId"`
		);
		await queryRunner.query(
			`ALTER TABLE "relationship" DROP CONSTRAINT "UQ_9547682b151a8d9ee40039aaea3"`
		);
		await queryRunner.query(
			`ALTER TABLE "relationship" DROP COLUMN "responseActivityId"`
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
		await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "updatedAt"`);
		await queryRunner.query(
			`ALTER TABLE "note" DROP CONSTRAINT "UQ_f5e9d69f538e3064206c4338338"`
		);
		await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "pollId"`);
		await queryRunner.query(
			`ALTER TABLE "user" DROP COLUMN "metadataValues"`
		);
		await queryRunner.query(
			`ALTER TABLE "user" DROP COLUMN "metadataKeys"`
		);
		await queryRunner.query(
			`ALTER TABLE "notification" ADD "object" character varying`
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
		await queryRunner.query(`ALTER TABLE "user" ADD "metadata" jsonb`);
		await queryRunner.query(`DROP TABLE "instance"`);
		await queryRunner.query(`DROP TABLE "activity"`);
		await queryRunner.query(`DROP TABLE "emoji"`);
		await queryRunner.query(`DROP TABLE "drive_file"`);
		await queryRunner.query(`DROP TABLE "moderated_instance"`);
		await queryRunner.query(`DROP TABLE "note_like"`);
		await queryRunner.query(`DROP TABLE "poll"`);
		await queryRunner.query(
			`ALTER TABLE "note" ADD CONSTRAINT "FK_74d4e4017198657d73a3b3d864d" FOREIGN KEY ("replyingToId") REFERENCES "note"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "note" ADD CONSTRAINT "FK_5b87d9d19127bd5d92026017a7b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}
}
