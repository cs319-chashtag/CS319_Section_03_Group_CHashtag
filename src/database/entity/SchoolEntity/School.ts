import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, ManyToOne, OneToMany  } from "typeorm"
import { ApprovedCourse } from "../CoursesEntity/ApprovedCourse"
import { Student } from "../UsersEntity/Student"
import { DepartmentType } from "../UsersEntity/User"

@Entity()
export class School {

    @PrimaryColumn({length: 40})
    name: string

    @Column('text', { array: true, default: [] })
    department: string[]

    @OneToMany(() => ApprovedCourse, (ApprovedCourse) => ApprovedCourse.school)
    approvedCourses: ApprovedCourse[]

    // @OneToMany(() => Student, (Student) => Student.school)
    // students: Student[]
}