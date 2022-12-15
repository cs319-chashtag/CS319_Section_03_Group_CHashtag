import { Entity, Column, PrimaryColumn, ChildEntity, ManyToOne, ManyToMany, JoinTable } from "typeorm"
import { HostCourse } from "./HostCourse"
import { StudentCourse } from "./StudentCourse"
import { School } from "../SchoolEntity/School"
import { ApprovedHostCourse } from "./ApprovedHostCourse"

@ChildEntity()
export class ApprovedCourse extends StudentCourse{
    

    @ManyToMany(() => ApprovedHostCourse, {eager: true, cascade: true})
    @JoinTable()
    approvedHostCourses: ApprovedHostCourse[]

    // @ManyToOne(type => StudentCourse, StudentCourse => StudentCourse.pendingCourse)
    // studentCourse: StudentCourse

    @ManyToOne(type => School, School => School.approvedCourses)
    school: School
}
