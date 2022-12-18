import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, ManyToOne, OneToMany, TableInheritance, ManyToMany, PrimaryGeneratedColumn, JoinTable  } from "typeorm"
import { BilkentCourse } from "./BilkentCourse"
import { DepartmentType } from "../UsersEntity/User"

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class StudentCourse {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    department: DepartmentType

    @OneToOne(() => BilkentCourse, {eager: true, cascade: true}) //,onDelete: "CASCADE"
    @JoinColumn()
    bilkentCourse: BilkentCourse
}