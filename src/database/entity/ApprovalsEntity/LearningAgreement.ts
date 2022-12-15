import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, ManyToOne, OneToMany, ManyToMany, JoinTable, PrimaryGeneratedColumn  } from "typeorm"
@Entity()
export class LearningAgreement {

    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 20})
    status: string

    @Column()
    link: string
}