import { PrimaryGeneratedColumn, ManyToMany, OneToMany, JoinColumn, JoinTable, Column, BeforeUpdate, BeforeInsert, Entity} from "typeorm";
import bcrypt from 'bcryptjs';
import Agenda from './AGENDA';
import Evento from './EVENTO'

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
    AGENDA: Agenda[];

    @OneToMany(() => Evento, evento => evento.USUARIO, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'CD_USUARIO'})
    EVENTO: Evento;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(){
        this.SENHA = bcrypt.hashSync(this.SENHA, 8)
    }

}