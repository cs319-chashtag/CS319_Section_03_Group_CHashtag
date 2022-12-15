import { Entity, Column, PrimaryColumn, ChildEntity, ManyToOne, JoinTable, ManyToMany } from "typeorm"
import { HostCourse } from "./HostCourse"
import { StudentCourse } from "./StudentCourse"
import { NotApprovedHostCourse } from "./NotApprovedHostCourse"

export enum CourseStatus {
    STUDENT_PENDING = "stdnt",
    INSTRUCTOR_PENDING = "crdnt",
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

    @ManyToMany(() => NotApprovedHostCourse)
    @JoinTable()
    notApprovedHostCourses: NotApprovedHostCourse[]
    
    // @ManyToOne(type => StudentCourse, StudentCourse => StudentCourse.pendingCourse)
    // studentCourse: StudentCourse
}