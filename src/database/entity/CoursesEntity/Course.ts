import { Entity, Column, PrimaryColumn, TableInheritance, PrimaryGeneratedColumn } from "typeorm"
import { DepartmentType } from "../UsersEntity/User"

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class Course {
    
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
}
