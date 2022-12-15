import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, TableInheritance } from "typeorm"

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class User {

    @PrimaryColumn()
    id: number

    @Column({unique: true, length: 30})
    email: string

    @Column({length: 20})
    firstName: string

    @Column({length: 20})
    lastName: string

    @Column()
    password: string
}
