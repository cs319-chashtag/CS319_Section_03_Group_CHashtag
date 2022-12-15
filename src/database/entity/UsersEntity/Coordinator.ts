import { Entity, Column, ChildEntity, OneToMany } from 'typeorm'
import { Instructor } from './Instructor'
import { PreApproval } from '../ApprovalsEntity/PreApproval'

@ChildEntity()
export class Coordinator extends Instructor {

    @OneToMany(() => PreApproval, preApproval => preApproval.coordinator)
    preApprovals: PreApproval[]

    // @Column({length: 30})
    // fctApprovals: string
}