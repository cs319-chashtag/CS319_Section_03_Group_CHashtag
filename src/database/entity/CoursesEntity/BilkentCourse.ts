import { Entity, Column, PrimaryColumn, ChildEntity, ManyToOne } from "typeorm"
import { BilkentUniversity } from "../SchoolEntity/BilkentUniversity"
import { Course } from "./Course"

export enum CourseType {
    MANDATORY = "Mandatory",
    ELECTIVE = "Elective",
}

@ChildEntity()
export class BilkentCourse extends Course{

    @Column({
        type: "enum",
        enum: CourseType,
        default: CourseType.ELECTIVE,
    })
    courseType: CourseType


    @ManyToOne(() => BilkentUniversity, (BilkentUniversity) => BilkentUniversity.bilkentCourses)
    bilkentUniversity: BilkentUniversity
}
