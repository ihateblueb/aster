import { MigrationInterface, QueryRunner } from "typeorm";

export class October9thChanges1728501245009 implements MigrationInterface {
    name = 'October9thChanges1728501245009'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth" RENAME COLUMN "created_at" TO "createdAt"`);
        await queryRunner.query(`CREATE TABLE "relationship" ("id" character varying NOT NULL, "to" character varying NOT NULL, "from" character varying NOT NULL, "type" character varying NOT NULL, "pending" boolean NOT NULL DEFAULT false, "createdAt" character varying NOT NULL, CONSTRAINT "PK_67eb56a3f16da3d901a8ae446a6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notification" ("id" character varying NOT NULL, "to" character varying NOT NULL, "from" character varying NOT NULL, "type" character varying NOT NULL, "read" boolean NOT NULL DEFAULT false, "createdAt" character varying NOT NULL, "object" character varying, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "note" ADD "createdAt" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "createdAt"`);
        await queryRunner.query(`DROP TABLE "notification"`);
        await queryRunner.query(`DROP TABLE "relationship"`);
        await queryRunner.query(`ALTER TABLE "auth" RENAME COLUMN "createdAt" TO "created_at"`);
    }

}
