import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/UsersEntity/User"
import { Student } from "./entity/UsersEntity/Student"
import { Instructor } from "./entity/UsersEntity/Instructor"
import { Coordinator } from "./entity/UsersEntity/Coordinator"
import { Course } from "./entity/CoursesEntity/Course"
import { BilkentCourse } from "./entity/CoursesEntity/BilkentCourse"
import { HostCourse } from "./entity/CoursesEntity/HostCourse"
import { ApprovedCourse } from "./entity/CoursesEntity/ApprovedCourse"
import { PendingCourse } from "./entity/CoursesEntity/PendingCourse"
import { ApprovedHostCourse } from "./entity/CoursesEntity/ApprovedHostCourse"
import { NotApprovedHostCourse } from "./entity/CoursesEntity/NotApprovedHostCourse"
import { School } from "./entity/SchoolEntity/School"
import { PreApproval } from "./entity/ApprovalsEntity/PreApproval"
import { LearningAgreement } from "./entity/ApprovalsEntity/LearningAgreement"
import { StudentCourse } from "./entity/CoursesEntity/StudentCourse"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "db.ca44bz618kui.us-east-1.rds.amazonaws.com",
    port: 5432,
    username: "postgres",
    password: "gyhkys-3siJha-nywzih",
    database: "postgres",
    entities: [
        User,
        Student,
        Instructor,
        Coordinator,
        Course,
        BilkentCourse,
        HostCourse,
        StudentCourse,
        ApprovedCourse,
        ApprovedHostCourse,
        NotApprovedHostCourse,
        PreApproval,
        // LearningAgreement,
        School,
    ],
    synchronize: true,
    logging: false,
})
