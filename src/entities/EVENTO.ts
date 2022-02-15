import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, JoinColumn} from "typeorm";
import Usuario from './USUARIO';
import Agenda from './AGENDA';

@Entity('EVENTO')
export default class Evento {
    @PrimaryGeneratedColumn('increment')
    CD_EVENTO: number;

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

    @ManyToOne(() => Usuario, usuario => usuario.EVENTO, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({name: 'CD_USUARIO'})
    USUARIO: Usuario[];

    @ManyToOne(() => Agenda, agenda => agenda.EVENTO, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({name: 'CD_AGENDA'})
    AGENDA: Agenda[];
}