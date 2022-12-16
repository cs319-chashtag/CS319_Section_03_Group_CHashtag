import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn  } from "typeorm"
import { ApprovedCourse } from "../CoursesEntity/ApprovedCourse"
import { Student } from "../UsersEntity/Student"
import { DepartmentType } from "../UsersEntity/User"

@Entity()
export class School {

    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 40, nullable: false})
    name: string
    
    @Column()
    department: DepartmentType

    @OneToMany(() => ApprovedCourse, (ApprovedCourse) => ApprovedCourse.school, {eager: true, cascade: true, onDelete: "CASCADE"})
    approvedCourses: ApprovedCourse[]
}