import { Entity, Column, ChildEntity, OneToOne, JoinColumn, ManyToOne } from 'typeorm'
import { User } from './User'
import { School } from '../SchoolEntity/School'
import { PreApproval } from '../ApprovalsEntity/PreApproval'
import { LearningAgreement } from '../ApprovalsEntity/LearningAgreement'

export enum ExchangeType {
    ERASMUS = "erasmus",
    BILETERAL= "bileteral",
}

@ChildEntity()
export class Student extends User {

    @Column({length: 10})
    department: string

    // @Column({length: 10})
    // exhangeType: string

    @Column({
        type: "enum",
        enum: ExchangeType,
        default: ExchangeType.ERASMUS,
    })
    exhangeType: ExchangeType

    // @ManyToOne(() => School, school => school.students)
    // @JoinColumn()
    // school: School

    @Column({length: 30})
    school: string

    @OneToOne(() => PreApproval, {eager: true, cascade: true, onDelete: "CASCADE"})
    @JoinColumn()
    preApproval: PreApproval

    // @OneToOne(() => LearningAgreement)
    // @JoinColumn()
    // learningAgreement: LearningAgreement
}