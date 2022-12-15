import { Entity, Column, ChildEntity } from 'typeorm'
import { BilkentCourse } from '../CoursesEntity/BilkentCourse'
import { User } from './User'

@ChildEntity()
export class Instructor extends User {
    @Column('text', { array: true })
    courses: string[]
}