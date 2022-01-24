import { PrimaryGeneratedColumn, Column, Entity, ManyToMany, OneToMany} from "typeorm";
import Usuario from './USUARIO';
import Agendamento from './AGENDAMENTO';

@Entity('AGENDA')
export default class Agenda {
    @PrimaryGeneratedColumn('increment')
    CD_AGENDA: number;

    @Column()
    CD_USUARIO: number;

    @Column()
    COR: string;

    @Column()
    NOME: string;

    @ManyToMany(() => Usuario, usuario => usuario.AGENDA, {
        cascade: ['insert', 'update']
    })
    USUARIO: Usuario[];

    @OneToMany(() => Agendamento, agendamento => agendamento.AGENDA, {
        cascade: ['insert', 'update']
    })
    AGENDAMENTO: Agendamento;
}