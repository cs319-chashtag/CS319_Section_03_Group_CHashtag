import { Entity, Column, PrimaryColumn, TableInheritance, PrimaryGeneratedColumn } from "typeorm"

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class Course {

    ////////////////////////// There should be a primary key here //////////////////////////
    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 20})
    code : string

    @Column({length: 20})
    department : string

    @Column({length: 50})
    name: string

    @Column()
    credit : number
}
