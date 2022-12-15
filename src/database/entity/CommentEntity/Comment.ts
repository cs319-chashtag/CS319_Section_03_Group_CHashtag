import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, TableInheritance } from "typeorm"

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class Comment {

    @PrimaryColumn()
    bilkentId: number

    @Column({length: 300})
    comment: string
}
