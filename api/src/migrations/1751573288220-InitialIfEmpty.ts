import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialIfEmpty1751573288220 implements MigrationInterface {
  name = 'InitialIfEmpty1751573288220';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Verifica se já existem tabelas no banco
    const tables = await queryRunner.getTables(["users", "plugins", "sales", "licenses", "settings", "email_configs"]);
    if (tables.length > 0) {
      // Já existe estrutura, não faz nada
      return;
    }
    // Cria as tabelas principais
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(255) NOT NULL,
        "username" VARCHAR(255) UNIQUE NOT NULL,
        "email" VARCHAR(255) UNIQUE NOT NULL,
        "password" VARCHAR(255) NOT NULL,
        "role" VARCHAR(50) DEFAULT 'user',
        "createdAt" TIMESTAMP DEFAULT now(),
        "updatedAt" TIMESTAMP DEFAULT now()
      );
      CREATE TABLE "plugins" (
        "id" SERIAL PRIMARY KEY,
        "slug" VARCHAR(255) NOT NULL,
        "name" VARCHAR(255) NOT NULL,
        "version" VARCHAR(50) NOT NULL,
        "description" TEXT NOT NULL,
        "author" VARCHAR(255) NOT NULL,
        "status" VARCHAR(50) DEFAULT 'active',
        "createdAt" TIMESTAMP DEFAULT now(),
        "updatedAt" TIMESTAMP DEFAULT now()
      );
      CREATE TABLE "sales" (
        "id" SERIAL PRIMARY KEY,
        "plugin" VARCHAR(255) NOT NULL,
        "buyer" VARCHAR(255) NOT NULL,
        "value" DECIMAL(10,2) NOT NULL,
        "status" VARCHAR(50) DEFAULT 'pago',
        "date" DATE NOT NULL,
        "token" VARCHAR(255) NOT NULL,
        "product" VARCHAR(255) NOT NULL,
        "createdAt" TIMESTAMP DEFAULT now(),
        "updatedAt" TIMESTAMP DEFAULT now()
      );
      CREATE TABLE "licenses" (
        "id" SERIAL PRIMARY KEY,
        "plugin_id" INT NOT NULL,
        "user_id" INT NOT NULL,
        "license_key" VARCHAR(255) NOT NULL,
        "status" VARCHAR(50) DEFAULT 'active',
        "createdAt" TIMESTAMP DEFAULT now(),
        "updatedAt" TIMESTAMP DEFAULT now()
      );
      CREATE TABLE "settings" (
        "id" SERIAL PRIMARY KEY,
        "key" VARCHAR(255) UNIQUE NOT NULL,
        "value" TEXT,
        "createdAt" TIMESTAMP DEFAULT now(),
        "updatedAt" TIMESTAMP DEFAULT now()
      );
      CREATE TABLE "email_configs" (
        "id" SERIAL PRIMARY KEY,
        "userId" INT NOT NULL,
        "protocol" VARCHAR(10) DEFAULT 'smtp',
        "host" VARCHAR(255) NOT NULL,
        "port" INT NOT NULL,
        "secure" BOOLEAN DEFAULT false,
        "username" VARCHAR(255) NOT NULL,
        "password" VARCHAR(255) NOT NULL,
        "fromName" VARCHAR(255),
        "fromEmail" VARCHAR(255),
        "theme" VARCHAR(20) DEFAULT 'outlook',
        "createdAt" TIMESTAMP DEFAULT now(),
        "updatedAt" TIMESTAMP DEFAULT now()
      );
      ALTER TABLE "licenses" ADD CONSTRAINT "fk_licenses_plugin" FOREIGN KEY ("plugin_id") REFERENCES "plugins"("id") ON DELETE CASCADE;
      ALTER TABLE "licenses" ADD CONSTRAINT "fk_licenses_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;
      ALTER TABLE "email_configs" ADD CONSTRAINT "fk_emailconfigs_user" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS "email_configs";
      DROP TABLE IF EXISTS "settings";
      DROP TABLE IF EXISTS "licenses";
      DROP TABLE IF EXISTS "sales";
      DROP TABLE IF EXISTS "plugins";
      DROP TABLE IF EXISTS "users";
    `);
  }
} 