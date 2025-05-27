import { MigrationInterface, QueryRunner } from 'typeorm';

export class SoftDeletion1746905738339 implements MigrationInterface {
  name = 'SoftDeletion1746905738339';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "assets" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "rpcConfigs" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "chains" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "chainAssets" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "userWallets" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "users" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "swapProviders" ADD "deletedAt" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "swapProviders" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "userWallets" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "chainAssets" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "chains" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "rpcConfigs" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "assets" DROP COLUMN "deletedAt"`);
  }
}
