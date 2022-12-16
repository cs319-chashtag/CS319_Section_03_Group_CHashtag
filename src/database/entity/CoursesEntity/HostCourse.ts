import { Entity, Column, PrimaryColumn, ChildEntity, OneToOne, JoinColumn, ManyToOne } from "typeorm"
import { School } from "../SchoolEntity/School"
import { Course } from "./Course"

@ChildEntity()
export class HostCourse extends Course{

    @Column()
    school: string
}
