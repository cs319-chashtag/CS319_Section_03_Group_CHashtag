import { Entity, Column, PrimaryColumn, ChildEntity, OneToOne, JoinColumn } from "typeorm"
import { School } from "../SchoolEntity/School"
import { HostCourse } from "./HostCourse"

@ChildEntity()
export class NotApprovedHostCourse extends HostCourse{

    @Column({length: 30})
    syllabusLink: string

    @Column({length: 30})
    courseInfoLink: string

    
}