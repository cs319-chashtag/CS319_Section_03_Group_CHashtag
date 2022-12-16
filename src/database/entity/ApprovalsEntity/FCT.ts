import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, ManyToOne, OneToMany, ManyToMany, JoinTable, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn  } from "typeorm"

export enum FCTSatus {
    COORDINATOR_PENDING = "crdnt",
    COORDINATOR_REJECTED = "crdnt_rej",
    ADMINISTRATION_PENDING = "adm",
    ADMINISTRATION_REJECTED = "adm_rej",
    APPROVED = "apprvd",
}

@Entity()
export class FCT {

    @PrimaryColumn()
    studentId: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
    
    @Column({
        type: "enum",
        enum: FCTSatus,
        default: FCTSatus.COORDINATOR_PENDING,
    })
    status: FCTSatus

    @Column({length: 128})
    fileLink: string
}