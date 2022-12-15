import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, ManyToOne, OneToMany, ManyToMany, JoinTable, CreateDateColumn  } from "typeorm"
// import { Student } from "../UsersEntity/Student"
import { StudentCourse } from "../CoursesEntity/StudentCourse"
import { Coordinator } from "../UsersEntity/Coordinator"
import { ApprovedCourse } from "../CoursesEntity/ApprovedCourse"
import { PendingCourse } from "../CoursesEntity/PendingCourse"
import { LearningAgreement } from "./LearningAgreement"
import { FCT } from "./FCT"

export enum ApprovalStatus {
    STUDENT_PENDING = "stdnt",
    COORDINATOR_PENDING = "crdnt",
    ADMINISTRATION_PENDING = "adm",
    APPROVED = "apprvd",
}

@Entity()
export class PreApproval {

    @PrimaryColumn()
    studentId: number

    @Column()
    totalCredit: number

    @CreateDateColumn()
    createdAt: Date

    @Column({length: 100})
    coordinatorResponse: string

    @Column({length: 100})
    administrationResponse: string

    @Column({
        type: "enum",
        enum: ApprovalStatus,
        default: ApprovalStatus.STUDENT_PENDING,
    })
    status: ApprovalStatus

    @ManyToMany(() => ApprovedCourse, {eager: true, cascade: true, onDelete: "CASCADE"})
    @JoinTable()
    approvedCourses: ApprovedCourse[]

    @ManyToMany(() => PendingCourse)
    @JoinTable()
    pendingCourses: PendingCourse[]

    @Column({length: 128})
    fileLink: string

    // @Column()
    // coordinatorId:  number

    // @OneToOne(() => LearningAggrement)
    // @JoinColumn()
    // learningAggrement: LearningAggrement
}