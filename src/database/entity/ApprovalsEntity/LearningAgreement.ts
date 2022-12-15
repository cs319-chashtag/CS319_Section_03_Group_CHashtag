import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, ManyToOne, OneToMany, ManyToMany, JoinTable, PrimaryGeneratedColumn, CreateDateColumn  } from "typeorm"

export enum LearningAggrementStatus {
    STUDENT_PENDING = "stdnt",
    COORDINATOR_PENDING = "crdnt",
    ADMINISTRATION_PENDING = "adm",
    APPROVED = "apprvd",
}

@Entity()
export class LearningAgreement {

    @PrimaryColumn()
    studentId: number
    
    @CreateDateColumn()
    createdAt: Date
    
    @Column({
        type: "enum",
        enum: LearningAggrementStatus,
        default: LearningAggrementStatus.STUDENT_PENDING,
    })
    status: LearningAggrementStatus

    @Column()
    fileLink: string
}