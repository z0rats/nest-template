import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1746902512269 implements MigrationInterface {
  name = 'InitialMigration1746902512269';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "auth" ("id" SERIAL NOT NULL, "address" text NOT NULL, "nonce" text NOT NULL, "expiresAt" TIMESTAMP NOT NULL, "used" boolean NOT NULL, CONSTRAINT "PK_7e416cf6172bc5aec04244f6459" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "assets" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "symbol" character varying NOT NULL, "name" character varying NOT NULL, "coingeckoId" text, CONSTRAINT "PK_da96729a8b113377cfb6a62439c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "rpcConfigs" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "chainId" uuid NOT NULL, "url" text NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "priority" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_56e06b8bfc6bb42819917d424a5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "transactions" ("id" BIGSERIAL NOT NULL, "txHash" text NOT NULL, "chainIdFrom" uuid, "chainIdTo" uuid, "addressFrom" text NOT NULL, "addressTo" text NOT NULL, "value" numeric, "txType" text NOT NULL, "status" text, "timestamp" TIMESTAMP, "chainFromId" uuid, "chainToId" uuid, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "portfolioSnapshots" ("id" BIGSERIAL NOT NULL, "userId" uuid NOT NULL, "walletId" uuid, "chainAssetId" uuid, "chainId" uuid, "timestamp" TIMESTAMP NOT NULL, "amount" numeric, "priceUsd" numeric, "totalUsd" numeric NOT NULL, "source" text NOT NULL, CONSTRAINT "PK_42ec85efbfd86ecd8a111e94bf0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "chains" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "chainType" text NOT NULL, "evmChainId" integer, "explorerUrl" text, "nativeAssetId" uuid NOT NULL, CONSTRAINT "PK_f3c6ca7e7ad0f451e3b8f3dd378" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "prices" ("id" BIGSERIAL NOT NULL, "chainAssetId" uuid NOT NULL, "priceUsd" numeric NOT NULL, "source" text NOT NULL, "timestamp" TIMESTAMP NOT NULL, CONSTRAINT "PK_2e40b9e4e631a53cd514d82ccd2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "chainAssets" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "assetId" uuid NOT NULL, "chainId" uuid NOT NULL, "address" text NOT NULL, "decimals" integer NOT NULL, "swapProviders" text array NOT NULL, "protocolId" integer, CONSTRAINT "PK_b8c03b1610c6a59dbf4141c2b85" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_a63f17128791c5cd74eca000fa" ON "chainAssets" ("chainId", "address") `,
    );
    await queryRunner.query(
      `CREATE TABLE "balances" ("id" BIGSERIAL NOT NULL, "chainAssetId" uuid NOT NULL, "walletId" uuid NOT NULL, "amount" numeric NOT NULL, "source" text NOT NULL, "blockNumber" bigint, "timestamp" TIMESTAMP NOT NULL, CONSTRAINT "PK_74904758e813e401abc3d4261c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "userWallets" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "address" text NOT NULL, "addressType" text NOT NULL, "label" text, CONSTRAINT "PK_9189d53ace5fe8cc083ea17bed4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" text NOT NULL, "tg" text NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "swapProviders" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" text NOT NULL, "config" jsonb NOT NULL, CONSTRAINT "PK_fc5f779fc76f8ef2cdad3d3d74d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "rpcConfigs" ADD CONSTRAINT "FK_12f1c6631852c73334183f29779" FOREIGN KEY ("chainId") REFERENCES "chains"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_a14bb83a2a73e4924de224cf628" FOREIGN KEY ("chainFromId") REFERENCES "chains"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_800e6470bc2d6d8e06257ec9fd1" FOREIGN KEY ("chainToId") REFERENCES "chains"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "portfolioSnapshots" ADD CONSTRAINT "FK_e74216d854aab1205b286029ac3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "portfolioSnapshots" ADD CONSTRAINT "FK_d2cfb8728b3c891a69aea400928" FOREIGN KEY ("walletId") REFERENCES "userWallets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "portfolioSnapshots" ADD CONSTRAINT "FK_3ff91d9a319ff4d4a6012198460" FOREIGN KEY ("chainAssetId") REFERENCES "chainAssets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "portfolioSnapshots" ADD CONSTRAINT "FK_4267352dd62e00d885439a8e29b" FOREIGN KEY ("chainId") REFERENCES "chains"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "chains" ADD CONSTRAINT "FK_3e032cef369e608072600b7094a" FOREIGN KEY ("nativeAssetId") REFERENCES "assets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "prices" ADD CONSTRAINT "FK_b4ce8bb514a85aa110d29fa54d1" FOREIGN KEY ("chainAssetId") REFERENCES "chainAssets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "chainAssets" ADD CONSTRAINT "FK_2b1899b1fac3937fed81a2823d7" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "chainAssets" ADD CONSTRAINT "FK_17569d72f5709fe4636abbd1352" FOREIGN KEY ("chainId") REFERENCES "chains"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "balances" ADD CONSTRAINT "FK_b428eed7ace0c55719721eb4067" FOREIGN KEY ("chainAssetId") REFERENCES "chainAssets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "balances" ADD CONSTRAINT "FK_062375498bd186a09412e44fa36" FOREIGN KEY ("walletId") REFERENCES "userWallets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "userWallets" ADD CONSTRAINT "FK_ee49ccdd4ea96650f9479b889e8" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "userWallets" DROP CONSTRAINT "FK_ee49ccdd4ea96650f9479b889e8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "balances" DROP CONSTRAINT "FK_062375498bd186a09412e44fa36"`,
    );
    await queryRunner.query(
      `ALTER TABLE "balances" DROP CONSTRAINT "FK_b428eed7ace0c55719721eb4067"`,
    );
    await queryRunner.query(
      `ALTER TABLE "chainAssets" DROP CONSTRAINT "FK_17569d72f5709fe4636abbd1352"`,
    );
    await queryRunner.query(
      `ALTER TABLE "chainAssets" DROP CONSTRAINT "FK_2b1899b1fac3937fed81a2823d7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "prices" DROP CONSTRAINT "FK_b4ce8bb514a85aa110d29fa54d1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "chains" DROP CONSTRAINT "FK_3e032cef369e608072600b7094a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "portfolioSnapshots" DROP CONSTRAINT "FK_4267352dd62e00d885439a8e29b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "portfolioSnapshots" DROP CONSTRAINT "FK_3ff91d9a319ff4d4a6012198460"`,
    );
    await queryRunner.query(
      `ALTER TABLE "portfolioSnapshots" DROP CONSTRAINT "FK_d2cfb8728b3c891a69aea400928"`,
    );
    await queryRunner.query(
      `ALTER TABLE "portfolioSnapshots" DROP CONSTRAINT "FK_e74216d854aab1205b286029ac3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_800e6470bc2d6d8e06257ec9fd1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_a14bb83a2a73e4924de224cf628"`,
    );
    await queryRunner.query(
      `ALTER TABLE "rpcConfigs" DROP CONSTRAINT "FK_12f1c6631852c73334183f29779"`,
    );
    await queryRunner.query(`DROP TABLE "swapProviders"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "userWallets"`);
    await queryRunner.query(`DROP TABLE "balances"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_a63f17128791c5cd74eca000fa"`);
    await queryRunner.query(`DROP TABLE "chainAssets"`);
    await queryRunner.query(`DROP TABLE "prices"`);
    await queryRunner.query(`DROP TABLE "chains"`);
    await queryRunner.query(`DROP TABLE "portfolioSnapshots"`);
    await queryRunner.query(`DROP TABLE "transactions"`);
    await queryRunner.query(`DROP TABLE "rpcConfigs"`);
    await queryRunner.query(`DROP TABLE "assets"`);
    await queryRunner.query(`DROP TABLE "auth"`);
  }
}
