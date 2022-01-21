import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class AGENDAUSUARIO1642105170665 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'AGENDA_USUARIO',
            columns: [
                {
                    name: 'CD_AGENDA_USUARIO',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'CD_AGENDA',
                    type: 'int'
                },
                {
                    name: 'CD_USUARIO',
                    type: 'int'
                }
            ],
            foreignKeys: [
                {
                    name: 'FK_AGENDA_USUARIO_USER',
                    columnNames: ['CD_USUARIO'],
                    referencedTableName: 'USUARIO',
                    referencedColumnNames: ['CD_USUARIO'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                    

                },
                {
                    name: 'FK_AGENDA_USUARIO_AGENDA',
                    columnNames: ['CD_AGENDA'],
                    referencedTableName: 'AGENDA',
                    referencedColumnNames: ['CD_AGENDA'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('AGENDA_USUARIO')
    }

}
