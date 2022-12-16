import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, TableInheritance } from "typeorm"

export enum UserType {
    STUDENT = "1",
    COORDINATOR = "2",
    ADMINISTRATION = "3",
    INSTRUCTOR = "4",
    ADMIN = "5",
}

export enum DepartmentType {
    CS = "cs",
    ME = "me",
    EEE = "eee",
    IE = "ie",
    MATH = "math",
    MBG = "mbg",
    PHYS = "physics",
    CHEM = "chem",
    PSYC = "psyc",
    ADA = "ada",
    ECON = "econ",
}

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class User {

    @PrimaryColumn()
    id: number

    @Column({unique: true, length: 50})
    email: string

    @Column({
        type: "enum",
        enum: DepartmentType,
        default: DepartmentType.CS,
    })
    department: DepartmentType

    @Column({length: 20})
    firstName: string

    @Column({length: 20})
    lastName: string

    @Column()
    password: string

    @Column({
        type: "enum",
        enum: UserType,
        default: UserType.STUDENT,
    })
    userType: UserType
}
