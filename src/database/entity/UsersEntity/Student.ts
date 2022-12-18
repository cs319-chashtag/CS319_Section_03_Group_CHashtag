import { Entity, Column, ChildEntity, OneToOne, JoinColumn, ManyToOne } from 'typeorm'
import { User } from './User'
import { School } from '../SchoolEntity/School'
import { PreApproval } from '../ApprovalsEntity/PreApproval'
import { LearningAgreement } from '../ApprovalsEntity/LearningAgreement'
import { Coordinator } from './Coordinator'
import { FCT } from '../ApprovalsEntity/FCT'
import { Administration } from './Administration'
import { Comment } from '../CommentEntity/Comment'

export enum ExchangeType {
    ERASMUS = "erasmus",
    BILETERAL = "bileteral",
}

export enum SemesterType {
    FALL = "fall",
    SPRING = "spring",
}

@ChildEntity()
export class Student extends User {

    @Column({
        type: "enum",
        enum: ExchangeType,
        default: ExchangeType.ERASMUS,
    })
    exhangeType: ExchangeType

    @Column({
        type: "enum",
        enum: SemesterType,
        default: SemesterType.FALL,
    })
    semesterType: SemesterType

    // @Column({length: 11})
    // academicYear: string
    
    @OneToOne(() => School, {eager: true})
    @JoinColumn()
    school: School

    @ManyToOne(() => Coordinator, (Coordinator) => Coordinator.students, {eager: true})
    coordinator: Coordinator

    @ManyToOne(() => Administration, (Administration) => Administration.students, {eager: true})
    administration: Administration
    
    @OneToOne(() => PreApproval, {eager: true, cascade: true, onDelete: "CASCADE"})
    @JoinColumn()
    preApproval: PreApproval

    @OneToOne(() => LearningAgreement , {eager: true, cascade: true, onDelete: "CASCADE"})
    @JoinColumn()
    learningAgreement: LearningAgreement

    @OneToOne(() => FCT, {eager: true, cascade: true, onDelete: "CASCADE"})
    @JoinColumn()
    fct: FCT

    @OneToOne(() => Comment, {eager: true, cascade: true})
    @JoinColumn()
    comment: Comment
}