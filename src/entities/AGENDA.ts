import { PrimaryGeneratedColumn, Column, Entity, ManyToMany, OneToMany, JoinTable} from "typeorm";
import Usuario from './USUARIO';
import Evento from './EVENTO';

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
        cascade: ['insert', 'update'],
        eager: true
    })
    @JoinTable({
        name: 'AGENDA_USUARIO',
        joinColumns: [{name: 'CD_AGENDA'}],
        inverseJoinColumns: [{name: 'CD_USUARIO'}],
    })
    USUARIO: Usuario[];

    @OneToMany(() => Evento, evento => evento.AGENDA, {
        cascade: ['insert', 'update']
    })
    EVENTO: Evento;
}