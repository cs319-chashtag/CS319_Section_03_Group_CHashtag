import { Entity, Column, PrimaryColumn, ChildEntity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { BilkentUniversity } from "../SchoolEntity/BilkentUniversity"
import { DepartmentType } from "../UsersEntity/User"

export enum CourseType {
    MANDATORY = "Mandatory",
    ELECTIVE = "Elective",
}

@Entity()
export class BilkentCourse{

    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 20, nullable: false})
    code : string

    @Column({length: 20})
    department : DepartmentType

    @Column({length: 50, nullable: true})
    name: string

    @Column()
    credit : number
    
    @Column({
        type: "enum",
        enum: CourseType,
        default: CourseType.ELECTIVE,
    })
    courseType: CourseType
    
    @ManyToOne(() => BilkentUniversity, (BilkentUniversity) => BilkentUniversity.bilkentCourses)
    bilkentUniversity: BilkentUniversity
}
