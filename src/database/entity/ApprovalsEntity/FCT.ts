import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, ManyToOne, OneToMany, ManyToMany, JoinTable, PrimaryGeneratedColumn, CreateDateColumn  } from "typeorm"

export enum FCTSatus {
    COORDINATOR_PENDING = "crdnt",
    ADMINISTRATION_PENDING = "adm",
    APPROVED = "apprvd",
}

@Entity()
export class FCT {

    @PrimaryColumn()
    studentId: number

    @CreateDateColumn()
    createdAt: Date
    
    @Column({
        type: "enum",
        enum: FCTSatus,
        default: FCTSatus.COORDINATOR_PENDING,
    })
    status: FCTSatus

    @Column({length: 128})
    fileLink: string
}