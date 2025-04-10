import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1744235533624 implements MigrationInterface {
    name = 'Migration1744235533624'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "relationship" DROP CONSTRAINT "FK_9547682b151a8d9ee40039aaea3"`);
        await queryRunner.query(`ALTER TABLE "relationship" RENAME COLUMN "responseActivityId" TO "activityForResponseId"`);
        await queryRunner.query(`ALTER TABLE "relationship" RENAME CONSTRAINT "UQ_9547682b151a8d9ee40039aaea3" TO "UQ_236833ba4c72c178bbdd03d096f"`);
        await queryRunner.query(`ALTER TABLE "emoji" ADD CONSTRAINT "UQ_a9f0bf399cb6b4ff21a57808cc1" UNIQUE ("apId")`);
        await queryRunner.query(`ALTER TABLE "relationship" ADD CONSTRAINT "FK_236833ba4c72c178bbdd03d096f" FOREIGN KEY ("activityForResponseId") REFERENCES "activity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "relationship" DROP CONSTRAINT "FK_236833ba4c72c178bbdd03d096f"`);
        await queryRunner.query(`ALTER TABLE "emoji" DROP CONSTRAINT "UQ_a9f0bf399cb6b4ff21a57808cc1"`);
        await queryRunner.query(`ALTER TABLE "relationship" RENAME CONSTRAINT "UQ_236833ba4c72c178bbdd03d096f" TO "UQ_9547682b151a8d9ee40039aaea3"`);
        await queryRunner.query(`ALTER TABLE "relationship" RENAME COLUMN "activityForResponseId" TO "responseActivityId"`);
        await queryRunner.query(`ALTER TABLE "relationship" ADD CONSTRAINT "FK_9547682b151a8d9ee40039aaea3" FOREIGN KEY ("responseActivityId") REFERENCES "activity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
