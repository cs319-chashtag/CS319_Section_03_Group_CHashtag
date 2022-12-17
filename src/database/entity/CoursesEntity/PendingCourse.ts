import { Entity, Column, PrimaryColumn, ChildEntity, ManyToOne, JoinTable, ManyToMany } from "typeorm"
import { HostCourse } from "./HostCourse"
import { StudentCourse } from "./StudentCourse"
import { NotApprovedHostCourse } from "./NotApprovedHostCourse"

export enum CourseStatus {
    STUDENT_PENDING = "stdnt",
    INSTRUCTOR_PENDING = "instr",
    INSTRUCTOR_REJECTED = "rjctd",
    COORDINATOR_PENDING = "crdnt",
    COORDINATOR_REJECTED = "crjct",
    APPROVED = "apprvd",
}

@ChildEntity()
export class PendingCourse extends StudentCourse{
    
    @Column({
        type: "enum",
        enum: CourseStatus,
        default: CourseStatus.STUDENT_PENDING,
    })
    status: CourseStatus

    @ManyToMany(() => NotApprovedHostCourse, {eager: true, cascade: true})
    @JoinTable()
    notApprovedHostCourses: NotApprovedHostCourse[]

    @Column({length: 100, nullable: true})
    instructorResponse: string
}