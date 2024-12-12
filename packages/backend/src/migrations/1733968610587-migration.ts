import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1733968610587 implements MigrationInterface {
    name = 'Migration1733968610587'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "note_closure" ("id_ancestor" character varying NOT NULL, "id_descendant" character varying NOT NULL, CONSTRAINT "PK_8840ebf2bafb11eed821bf74e5b" PRIMARY KEY ("id_ancestor", "id_descendant"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c595484fba68bc88524030ce37" ON "note_closure" ("id_ancestor") `);
        await queryRunner.query(`CREATE INDEX "IDX_924868788a237a99f9bb21e53b" ON "note_closure" ("id_descendant") `);
        await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "nsleft"`);
        await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "nsright"`);
        await queryRunner.query(`ALTER TABLE "note_closure" ADD CONSTRAINT "FK_c595484fba68bc88524030ce370" FOREIGN KEY ("id_ancestor") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "note_closure" ADD CONSTRAINT "FK_924868788a237a99f9bb21e53ba" FOREIGN KEY ("id_descendant") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note_closure" DROP CONSTRAINT "FK_924868788a237a99f9bb21e53ba"`);
        await queryRunner.query(`ALTER TABLE "note_closure" DROP CONSTRAINT "FK_c595484fba68bc88524030ce370"`);
        await queryRunner.query(`ALTER TABLE "note" ADD "nsright" integer NOT NULL DEFAULT '2'`);
        await queryRunner.query(`ALTER TABLE "note" ADD "nsleft" integer NOT NULL DEFAULT '1'`);
        await queryRunner.query(`DROP INDEX "public"."IDX_924868788a237a99f9bb21e53b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c595484fba68bc88524030ce37"`);
        await queryRunner.query(`DROP TABLE "note_closure"`);
    }

}
