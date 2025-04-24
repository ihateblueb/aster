import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1745510084010 implements MigrationInterface {
    name = 'Migration1745510084010'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "taken_usernames" ("username" character varying NOT NULL, CONSTRAINT "PK_a619c425f83e67392640a3a77d9" PRIMARY KEY ("username"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "taken_usernames"`);
    }

}
