import { Entity, Column, PrimaryColumn, ChildEntity, OneToOne, JoinColumn } from "typeorm"
import { School } from "../SchoolEntity/School"
import { Course } from "./Course"

@ChildEntity()
export class HostCourse extends Course{

    @Column({length: 30})
    school: string
    
    // @OneToOne(() => School)
    // @JoinColumn()
    // school: School
}
