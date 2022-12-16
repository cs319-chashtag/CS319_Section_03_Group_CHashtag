import { Entity, Column, ChildEntity, OneToMany } from 'typeorm'
import { FCT } from '../ApprovalsEntity/FCT'
import { LearningAgreement } from '../ApprovalsEntity/LearningAgreement'
import { PreApproval } from '../ApprovalsEntity/PreApproval'
import { Student } from './Student'
import { User } from './User'

@ChildEntity()
export class Administration extends User {
    
    @OneToMany(() => Student, (Student) => Student.administration)
    students: Student[]
    
}
