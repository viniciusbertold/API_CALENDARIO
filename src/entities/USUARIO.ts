import { PrimaryGeneratedColumn, ManyToMany, OneToMany, JoinColumn, JoinTable, Column, BeforeUpdate, BeforeInsert, Entity} from "typeorm";
import bcrypt from 'bcryptjs';
import Agenda from './AGENDA';
import Agendamento from './AGENDAMENTO'

@Entity('USUARIO')
export default class Usuario {
    @PrimaryGeneratedColumn('increment')
    CD_USUARIO: number;

    @Column()
    NOME: string;

    @Column()
    EMAIL: string;

    @Column()
    SENHA: string;

    @ManyToMany(() => Agenda, agenda => agenda.USUARIO, {
        cascade: ['insert', 'update']
    })
    @JoinTable({
        name: 'AGENDA_USUARIO',
        joinColumns: [{name: 'CD_USUARIO'}],
        inverseJoinColumns: [{name: 'CD_AGENDA'}]
    })
    AGENDA: Agenda[];

    @OneToMany(() => Agendamento, agendamento => agendamento.USUARIO, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'CD_USUARIO'})
    AGENDAMENTO: Agendamento;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(){
        this.SENHA = bcrypt.hashSync(this.SENHA, 8)
    }

}