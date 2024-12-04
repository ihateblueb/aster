import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1733327918307 implements MigrationInterface {
    name = 'Migrations1733327918307'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_preferences" ("id" character varying NOT NULL, "userId" character varying NOT NULL, CONSTRAINT "PK_e8cfb5b31af61cd363a6b6d7c25" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "to"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "from"`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "toId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "fromId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_preferences" ADD CONSTRAINT "FK_b6202d1cacc63a0b9c8dac2abd4" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_fafec2a7604ef9e0ccc328d7496" FOREIGN KEY ("toId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_3d1d1eefef4ce87fae858ff2bb5" FOREIGN KEY ("fromId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_3d1d1eefef4ce87fae858ff2bb5"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_fafec2a7604ef9e0ccc328d7496"`);
        await queryRunner.query(`ALTER TABLE "user_preferences" DROP CONSTRAINT "FK_b6202d1cacc63a0b9c8dac2abd4"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "fromId"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "toId"`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "from" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "to" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "user_preferences"`);
    }

}
