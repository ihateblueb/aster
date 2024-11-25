import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1732494089679 implements MigrationInterface {
    name = 'Migration1732494089679'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "relationship" DROP COLUMN "to"`);
        await queryRunner.query(`ALTER TABLE "relationship" DROP COLUMN "from"`);
        await queryRunner.query(`ALTER TABLE "relationship" ADD "toId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "relationship" ADD "fromId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "relationship" ADD CONSTRAINT "FK_332373da772200e2469b6cb5c5c" FOREIGN KEY ("toId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "relationship" ADD CONSTRAINT "FK_d7842baddfa9514c8b0af81a4e0" FOREIGN KEY ("fromId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "relationship" DROP CONSTRAINT "FK_d7842baddfa9514c8b0af81a4e0"`);
        await queryRunner.query(`ALTER TABLE "relationship" DROP CONSTRAINT "FK_332373da772200e2469b6cb5c5c"`);
        await queryRunner.query(`ALTER TABLE "relationship" DROP COLUMN "fromId"`);
        await queryRunner.query(`ALTER TABLE "relationship" DROP COLUMN "toId"`);
        await queryRunner.query(`ALTER TABLE "relationship" ADD "from" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "relationship" ADD "to" character varying NOT NULL`);
    }

}
