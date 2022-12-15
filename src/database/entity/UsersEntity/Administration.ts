import { Entity, Column, ChildEntity } from 'typeorm'
import { User } from './User'

@ChildEntity()
export class Coordinator extends User {

    @Column({length: 10})
    department: string
    
    @Column({length: 30})
    preApprovals: string

    @Column({length: 30})
    fctApprovals: string
}