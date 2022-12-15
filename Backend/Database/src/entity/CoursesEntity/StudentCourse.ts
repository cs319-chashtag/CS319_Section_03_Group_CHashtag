import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, ManyToOne, OneToMany, TableInheritance, ManyToMany, PrimaryGeneratedColumn, JoinTable  } from "typeorm"
// import { ApprovedCourse } from "./ApprovedCourse"
// import { PendingCourse } from "./PendingCourse"
import { PreApproval } from "../ApprovalsEntity/PreApproval"
import { BilkentCourse } from "./BilkentCourse"

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class StudentCourse {

    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => BilkentCourse, {eager: true,  onDelete: "CASCADE"})
    @JoinColumn()
    bilkentCourse: BilkentCourse

    // @ManyToMany(type => PreApproval, PreApproval => PreApproval.studentCourses)
    // @JoinTable()
    // preApproval: PreApproval[]

    // @OneToMany(() => ApprovedCourse, (ApprovedCourse) => ApprovedCourse.studentCourse)
    // approvedCourse: ApprovedCourse[]

    // @OneToMany(() => PendingCourse, (PendingCourse) => PendingCourse.studentCourse)
    // pendingCourse: PendingCourse[]
}