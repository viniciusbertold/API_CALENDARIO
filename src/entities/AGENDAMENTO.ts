import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, JoinColumn} from "typeorm";
import Usuario from './USUARIO';
import Agenda from './AGENDA';

@Entity('AGENDAMENTO')
export default class Agendamento {
    @PrimaryGeneratedColumn('increment')
    CD_AGENDAMENTO: number;

    @Column()
    CD_USUARIO: number;

    @Column()
    CD_AGENDA: number;

    @Column()
    EVENTO: string;

    @Column()
    DESCRICAO: string;

    @Column()
    DATA: Date;

    @ManyToOne(() => Usuario, usuario => usuario.AGENDAMENTO, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({name: 'CD_USUARIO'})
    USUARIO: Usuario[];

    @ManyToOne(() => Agenda, agenda => agenda.AGENDAMENTO, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({name: 'CD_AGENDA'})
    AGENDA: Agenda[];
}