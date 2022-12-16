import { Entity, Column, PrimaryColumn, ChildEntity, ManyToOne, ManyToMany, JoinTable } from "typeorm"
import { HostCourse } from "./HostCourse"
import { StudentCourse } from "./StudentCourse"
import { School } from "../SchoolEntity/School"
import { ApprovedHostCourse } from "./ApprovedHostCourse"

@ChildEntity()
export class ApprovedCourse extends StudentCourse{
    @ManyToMany(() => ApprovedHostCourse, {eager: true, cascade: true, onDelete: "CASCADE"})
    @JoinTable()
    approvedHostCourses: ApprovedHostCourse[]
    
    @ManyToOne(type => School, School => School.approvedCourses)
    school: School
}

