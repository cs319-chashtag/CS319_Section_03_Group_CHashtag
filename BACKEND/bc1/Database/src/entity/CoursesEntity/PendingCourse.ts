import { Entity, Column, PrimaryColumn, ChildEntity, ManyToOne, JoinTable, ManyToMany } from "typeorm"
import { HostCourse } from "./HostCourse"
import { StudentCourse } from "./StudentCourse"
import { NotApprovedHostCourse } from "./NotApprovedHostCourse"

@ChildEntity()
export class PendingCourse extends StudentCourse{

    @ManyToMany(() => NotApprovedHostCourse)
    @JoinTable()
    notApprovedHostCourses: NotApprovedHostCourse[]
    
    // @ManyToOne(type => StudentCourse, StudentCourse => StudentCourse.pendingCourse)
    // studentCourse: StudentCourse
}