import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, ManyToOne, OneToMany, ManyToMany, JoinTable, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn  } from "typeorm"
import { ApprovalStatus } from "./PreApproval"

// export enum LearningAggrementStatus {
//     STUDENT_PENDING = "stdnt",
//     COORDINATOR_PENDING = "crdnt",
//     COORDINATOR_REJECTED = "crdnt_rej",
//     ADMINISTRATION_PENDING = "adm",
//     ADMINISTRATION_REJECTED = "adm_rej",
//     APPROVED = "apprvd",
// }

@Entity()
export class LearningAgreement {

    @PrimaryColumn()
    studentId: number
    
    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
    
    @Column({
        type: "enum",
        enum: ApprovalStatus,
        default: ApprovalStatus.STUDENT_PENDING,
    })
    status: ApprovalStatus

    @Column()
    fileLink: string
}