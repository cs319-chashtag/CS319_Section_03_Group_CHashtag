import { Entity, Column, PrimaryColumn, ChildEntity, OneToOne, JoinColumn } from "typeorm"
import { School } from "../SchoolEntity/School"
import { HostCourse } from "./HostCourse"

@ChildEntity()
export class NotApprovedHostCourse extends HostCourse{

    // @Column({length: 128})
    // syllabusLink: string
    
    @Column({length: 150})
    studentMessage: string
}