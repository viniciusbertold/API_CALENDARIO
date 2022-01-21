import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class AGENDAMENTO1642105181037 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:'AGENDAMENTO',
            columns: [
                {
                    name: 'CD_AGENDAMENTO',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'CD_USUARIO',
                    type: 'int'
                },
                {
                    name: 'CD_AGENDA',
                    type: 'int'
                },
                {
                    name: 'EVENTO',
                    type: 'varchar'
                },
                {
                    name: 'DESCRICAO',
                    type: 'text',
                    isNullable: true
                },
                {
                    name: 'DATA',
                    type: 'timestamp with time zone'
                }
            ],
            foreignKeys: [
                {
                    name: 'FK_AGENDAMENTO_USUARIO',
                    columnNames: ['CD_USUARIO'],
                    referencedTableName: 'USUARIO',
                    referencedColumnNames: ['CD_USUARIO'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                },
                {
                    name: 'FK_AGENDAMENTO_AGENDA',
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
        await queryRunner.dropTable('AGENDAMENTO')
    }

}
