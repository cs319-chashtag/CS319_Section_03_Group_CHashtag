import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, ManyToOne, OneToMany  } from "typeorm"
import { ApprovedCourse } from "../CoursesEntity/ApprovedCourse"
import { BilkentCourse } from "../CoursesEntity/BilkentCourse"
import { Student } from "../UsersEntity/Student"
import { DepartmentType } from "../UsersEntity/User"

@Entity()
export class BilkentUniversity {

    @PrimaryColumn()
    deparment: DepartmentType

    @OneToMany(() => BilkentCourse, (BilkentCourse) => BilkentCourse.bilkentUniversity, {eager: true, cascade: true, onDelete: "CASCADE"})
    bilkentCourses: BilkentCourse[]
}