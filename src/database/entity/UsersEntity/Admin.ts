import { Entity, Column, ChildEntity } from 'typeorm'
import { User } from './User'

@ChildEntity()
export class Admin extends User {
}