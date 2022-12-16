import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, ManyToOne, OneToMany, TableInheritance, ManyToMany, PrimaryGeneratedColumn, JoinTable  } from "typeorm"
import { PreApproval } from "../ApprovalsEntity/PreApproval"
import { BilkentCourse } from "./BilkentCourse"

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class StudentCourse {

    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => BilkentCourse, {eager: true, cascade: true}) //,onDelete: "CASCADE"
    @JoinColumn()
    bilkentCourse: BilkentCourse
}