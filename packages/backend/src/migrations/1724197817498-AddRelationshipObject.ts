import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRelationshipObject1724197817498 implements MigrationInterface {
	name = 'AddRelationshipObject1724197817498';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "relationship" ADD "object" jsonb`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "relationship" DROP COLUMN "object"`
		);
	}
}
