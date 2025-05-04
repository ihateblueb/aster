import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1746296630743 implements MigrationInterface {
    name = 'Migration1746296630743'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invite" DROP COLUMN "creator"`);
        await queryRunner.query(`ALTER TABLE "invite" DROP COLUMN "usedBy"`);
        await queryRunner.query(`ALTER TABLE "invite" ADD "creatorId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invite" ADD "userId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invite" ADD CONSTRAINT "FK_82c1fc1de3cedfd660ea8359e0b" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invite" ADD CONSTRAINT "FK_91bfeec7a9574f458e5b592472d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invite" DROP CONSTRAINT "FK_91bfeec7a9574f458e5b592472d"`);
        await queryRunner.query(`ALTER TABLE "invite" DROP CONSTRAINT "FK_82c1fc1de3cedfd660ea8359e0b"`);
        await queryRunner.query(`ALTER TABLE "invite" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "invite" DROP COLUMN "creatorId"`);
        await queryRunner.query(`ALTER TABLE "invite" ADD "usedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "invite" ADD "creator" character varying NOT NULL`);
    }

}
