import { MigrationInterface, QueryRunner } from "typeorm";

export class OneMore1728722386115 implements MigrationInterface {
    name = 'OneMore1728722386115'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" DROP CONSTRAINT "FK_5b87d9d19127bd5d92026017a7b"`);
        await queryRunner.query(`ALTER TABLE "note" RENAME COLUMN "userId" TO "user"`);
        await queryRunner.query(`ALTER TABLE "note" ADD CONSTRAINT "FK_dd31e8dea0de8f619c93095cec4" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" DROP CONSTRAINT "FK_dd31e8dea0de8f619c93095cec4"`);
        await queryRunner.query(`ALTER TABLE "note" RENAME COLUMN "user" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "note" ADD CONSTRAINT "FK_5b87d9d19127bd5d92026017a7b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
