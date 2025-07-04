import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1680000000000 implements MigrationInterface {
    name = 'InitialMigration1680000000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
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
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "sales"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "plugins"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "users"`);
    }
} 