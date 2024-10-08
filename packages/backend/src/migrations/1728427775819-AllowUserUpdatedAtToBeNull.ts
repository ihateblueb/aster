import { MigrationInterface, QueryRunner } from 'typeorm';

export class AllowUserUpdatedAtToBeNull1728427775819
	implements MigrationInterface
{
	name = 'AllowUserUpdatedAtToBeNull1728427775819';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "user" DROP CONSTRAINT "UQ_9ec886924bcd97ae6f14220017a"`
		);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "user"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "privateKey"`);
		await queryRunner.query(
			`ALTER TABLE "user" DROP CONSTRAINT "UQ_98c3361fca2f1f3f737da4ed443"`
		);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "apId"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "inbox"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "outbox"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "displayName"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "host"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "local"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "locked"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "suspended"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deactivated"`);
		await queryRunner.query(
			`ALTER TABLE "user" DROP COLUMN "discoverable"`
		);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "indexable"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "automated"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "bio"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "location"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "birthday"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "metadata"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isCat"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "speakAsCat"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "banner"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "background"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
		await queryRunner.query(
			`ALTER TABLE "user" DROP COLUMN "followingUrl"`
		);
		await queryRunner.query(
			`ALTER TABLE "user" DROP COLUMN "followersUrl"`
		);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "admin"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "publicKey"`);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "apId" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD CONSTRAINT "UQ_98c3361fca2f1f3f737da4ed443" UNIQUE ("apId")`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "inbox" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "outbox" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "username" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "displayName" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "host" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "local" boolean NOT NULL DEFAULT false`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "locked" boolean NOT NULL DEFAULT false`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "suspended" boolean NOT NULL DEFAULT false`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "deactivated" boolean NOT NULL DEFAULT false`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "discoverable" boolean NOT NULL DEFAULT false`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "indexable" boolean NOT NULL DEFAULT false`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "automated" boolean NOT NULL DEFAULT false`
		);
		await queryRunner.query(`ALTER TABLE "user" ADD "bio" boolean`);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "location" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "birthday" character varying`
		);
		await queryRunner.query(`ALTER TABLE "user" ADD "metadata" jsonb`);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "isCat" boolean NOT NULL DEFAULT false`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "speakAsCat" boolean NOT NULL DEFAULT false`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "avatar" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "banner" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "background" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "createdAt" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "updatedAt" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "followingUrl" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "followersUrl" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "admin" boolean NOT NULL DEFAULT false`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "publicKey" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "user" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD CONSTRAINT "UQ_9ec886924bcd97ae6f14220017a" UNIQUE ("user")`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "password" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "privateKey" character varying NOT NULL`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "privateKey"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
		await queryRunner.query(
			`ALTER TABLE "user" DROP CONSTRAINT "UQ_9ec886924bcd97ae6f14220017a"`
		);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "user"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "publicKey"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "admin"`);
		await queryRunner.query(
			`ALTER TABLE "user" DROP COLUMN "followersUrl"`
		);
		await queryRunner.query(
			`ALTER TABLE "user" DROP COLUMN "followingUrl"`
		);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "background"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "banner"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "speakAsCat"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isCat"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "metadata"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "birthday"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "location"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "bio"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "automated"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "indexable"`);
		await queryRunner.query(
			`ALTER TABLE "user" DROP COLUMN "discoverable"`
		);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deactivated"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "suspended"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "locked"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "local"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "host"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "displayName"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "outbox"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "inbox"`);
		await queryRunner.query(
			`ALTER TABLE "user" DROP CONSTRAINT "UQ_98c3361fca2f1f3f737da4ed443"`
		);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "apId"`);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "publicKey" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "admin" boolean NOT NULL DEFAULT false`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "followersUrl" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "followingUrl" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "updatedAt" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "createdAt" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "background" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "banner" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "avatar" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "speakAsCat" boolean NOT NULL DEFAULT false`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "isCat" boolean NOT NULL DEFAULT false`
		);
		await queryRunner.query(`ALTER TABLE "user" ADD "metadata" jsonb`);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "birthday" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "location" character varying`
		);
		await queryRunner.query(`ALTER TABLE "user" ADD "bio" boolean`);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "automated" boolean NOT NULL DEFAULT false`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "indexable" boolean NOT NULL DEFAULT false`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "discoverable" boolean NOT NULL DEFAULT false`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "deactivated" boolean NOT NULL DEFAULT false`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "suspended" boolean NOT NULL DEFAULT false`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "locked" boolean NOT NULL DEFAULT false`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "local" boolean NOT NULL DEFAULT false`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "host" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "displayName" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "username" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "outbox" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "inbox" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "apId" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD CONSTRAINT "UQ_98c3361fca2f1f3f737da4ed443" UNIQUE ("apId")`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "privateKey" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "password" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "user" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD CONSTRAINT "UQ_9ec886924bcd97ae6f14220017a" UNIQUE ("user")`
		);
	}
}
