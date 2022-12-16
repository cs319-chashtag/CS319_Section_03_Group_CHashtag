import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, TableInheritance } from "typeorm"
import { School } from "../SchoolEntity/School"

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class Comment {

    @PrimaryColumn()
    bilkentId: number

    @Column({length: 50})
    schoolName: string

    @Column({length: 300})
    comment: string
}
