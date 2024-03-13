import { MigrationInterface, QueryRunner } from "typeorm";

export class Library1710151921449 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS library_record (
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                checkInTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                checkOutTime TIMESTAMP NULL ,
                registrationNumber VARCHAR(50),
                studentBranch VARCHAR(50),
                studentName VARCHAR(255)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS library_record;
        `);
    }

}
