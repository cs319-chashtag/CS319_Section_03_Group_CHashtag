import { Entity, Column, ChildEntity } from 'typeorm'
import { User } from './User'

@ChildEntity()
export class Instructor extends User {
    @Column({length: 10})
    department: string

    @Column({length: 10})
    courses: string
}