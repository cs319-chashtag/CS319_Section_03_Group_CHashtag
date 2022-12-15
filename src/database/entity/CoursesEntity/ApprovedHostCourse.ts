import { Entity, Column, PrimaryColumn, ChildEntity, OneToOne, JoinColumn } from "typeorm"
import { School } from "../SchoolEntity/School"
import { HostCourse } from "./HostCourse"

@ChildEntity()
export class ApprovedHostCourse extends HostCourse{

}