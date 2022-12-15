import { Entity, Column, PrimaryColumn, ChildEntity } from "typeorm"
import { Course } from "./Course"

// enum CourseType {
//     "Mandatory",
//     "Elective",
//     ""

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

    // @Column({length: 30})
    // courseType: string
}
