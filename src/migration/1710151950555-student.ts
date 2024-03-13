import { MigrationInterface, QueryRunner } from "typeorm";

export class Student1710151950555 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE  student (
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                registrationNumber VARCHAR(50) NOT NULL,
                branch VARCHAR(50) NOT NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS student;
        `);
       
    }

}
