import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class USUARIO1642104892588 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'USUARIO',
            columns: [
                {
                    name: "CD_USUARIO",
                    type: "int",
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true, //true significa que é gerada automaticamente a coluna
                    generationStrategy: 'increment' //auto-increment

                },
                {
                    name: 'NOME',
                    type: 'varchar',
                },
                {
                    name: 'EMAIL',
                    type: 'varchar'
                },
                {
                    name: 'SENHA',
                    type: 'text'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('USUARIO')
    }

}
