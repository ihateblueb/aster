import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUniqueConstraints1719968830932 implements MigrationInterface {
	name = 'AddUniqueConstraints1719968830932';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note_edit" ADD "ap_id" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "note_edit" ADD CONSTRAINT "UQ_b192d33779e74f619011edc574a" UNIQUE ("ap_id")`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD CONSTRAINT "UQ_772a060d3e7f2716e9c3f052b52" UNIQUE ("ap_id")`
		);
		await queryRunner.query(
			`ALTER TABLE "note" ALTER COLUMN "ap_id" SET NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "note" ADD CONSTRAINT "UQ_24c74679b64e32083de1b0c9483" UNIQUE ("ap_id")`
		);
		await queryRunner.query(
			`ALTER TABLE "emoji" ADD CONSTRAINT "UQ_12edc40117defe6a24749d1072a" UNIQUE ("ap_id")`
		);
		await queryRunner.query(
			`ALTER TABLE "note_react" ADD CONSTRAINT "UQ_c2d4f7d30fc68a7bf880177b534" UNIQUE ("ap_id")`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note_react" DROP CONSTRAINT "UQ_c2d4f7d30fc68a7bf880177b534"`
		);
		await queryRunner.query(
			`ALTER TABLE "emoji" DROP CONSTRAINT "UQ_12edc40117defe6a24749d1072a"`
		);
		await queryRunner.query(
			`ALTER TABLE "note" DROP CONSTRAINT "UQ_24c74679b64e32083de1b0c9483"`
		);
		await queryRunner.query(
			`ALTER TABLE "note" ALTER COLUMN "ap_id" DROP NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "user" DROP CONSTRAINT "UQ_772a060d3e7f2716e9c3f052b52"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_edit" DROP CONSTRAINT "UQ_b192d33779e74f619011edc574a"`
		);
		await queryRunner.query(`ALTER TABLE "note_edit" DROP COLUMN "ap_id"`);
	}
}
