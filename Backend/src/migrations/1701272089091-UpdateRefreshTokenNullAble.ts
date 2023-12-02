import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRefreshTokenNullAble1701272089091 implements MigrationInterface {
    name = 'UpdateRefreshTokenNullAble1701272089091'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "refreshToken" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "refreshToken" SET NOT NULL`);
    }

}
