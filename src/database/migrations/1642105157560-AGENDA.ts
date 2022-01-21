import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class AGENDA1642105157560 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'AGENDA',
            columns: [
                {
                    name: 'CD_AGENDA',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'NOME',
                    type: 'varchar'
                },
                {
                    name: 'COR',
                    type: 'varchar'
                },
                {
                    name: 'CD_USUARIO',
                    type: 'int'
                }
            ],
            foreignKeys: [
                {
                    name: 'FK_AGENDA_USUARIO',
                    columnNames: ['CD_USUARIO'],
                    referencedTableName: 'USUARIO',
                    referencedColumnNames: ['CD_USUARIO'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('AGENDA')
    }

}
