import { Entity, Column, ChildEntity, OneToMany } from 'typeorm'
import { Instructor } from './Instructor'
import { PreApproval } from '../ApprovalsEntity/PreApproval'
import { FCT } from '../ApprovalsEntity/FCT'
import { LearningAgreement } from '../ApprovalsEntity/LearningAgreement'
import { Student } from './Student'

@ChildEntity()
export class Coordinator extends Instructor {

    @OneToMany(() => Student, (Student) => Student.coordinator)
    students: Student[]

    // @Column()
    // preApprovals: PreApproval[]

    // @Column()
    // learningAgreements: LearningAgreement[]
    
    // @Column()
    // fctApprovals: FCT[]
}