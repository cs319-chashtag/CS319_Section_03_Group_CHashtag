import { Repository } from "typeorm";
import { AppDataSource } from "../data-source"
import { Administration } from "../entity/UsersEntity/Administration";
import { DepartmentType, UserType } from "../entity/UsersEntity/User"
import StudentRepo from "./StudentRepo";
import { ApprovalStatus } from "../entity/ApprovalsEntity/PreApproval";
import ApprovedCourseRepo from "./ApprovedCourseRepo";
import SchoolRepo from "./SchoolRepo";
import BilkentUniRepo from "./BilkentUniRepo";
import { ApprovedCourse } from "../entity/CoursesEntity/ApprovedCourse";
import { FCTSatus } from "../entity/ApprovalsEntity/FCT";


export default class AdministrationRepo {
    private static _administrationRepository = AppDataSource.getRepository(Administration);

    //DONE
    public static async findAdministrationById(id : number): Promise<Administration | null> {
        
        return this._administrationRepository.findOne({
            where: {
                id: id
            },
            // relations: {
            //     // preApproval: {
            // }
        })
    }

    public static async approveStudentPreApproval(studentId : number, administrationId : number, administrationApproved: boolean): Promise<boolean> {
        const student = await StudentRepo.findStudentById(studentId);

        if (student == null) {
            throw new Error("Student does not exist");
        }
        if ( student.administration.id != administrationId) {
            throw new Error("Student is not assigned to this administration");
        }
        if (student.preApproval == null) {
            throw new Error("Student does not have a pre-approval");
        }
        if ( student.preApproval.status != ApprovalStatus.ADMINISTRATION_PENDING){
            throw new Error("Student pre-approval is not in administration pending status");
        }
        if ( administrationApproved )
            student.preApproval.status = ApprovalStatus.APPROVED;
        else
            student.preApproval.status = ApprovalStatus.APPROVED;

        for( const pendingCourse of student.preApproval.pendingCourses) {
            const schoolName = student.school.name;
            await ApprovedCourseRepo.createApprovedCourse(schoolName, student.department);
            for (const notApprovedHostCourse of pendingCourse.notApprovedHostCourses) {
                await ApprovedCourseRepo.addApprovedHostCourse(schoolName, student.department, notApprovedHostCourse.code, notApprovedHostCourse.name, notApprovedHostCourse.credit)
            }

            await BilkentUniRepo.addBilkentCourse( student.department, pendingCourse.bilkentCourse.code, pendingCourse.bilkentCourse.name, pendingCourse.bilkentCourse.courseType ,pendingCourse.bilkentCourse.credit);
        }
        return true;
    }

    public static async approveStudentLA(studentId : number, administrationId : number, administrationApproved: boolean): Promise<boolean> {
        const student = await StudentRepo.findStudentById(studentId);

        if (student == null) {
            throw new Error("Student does not exist");
        }
        if ( student.administration.id != administrationId) {
            throw new Error("Student is not assigned to this administration");
        }
        if (student.learningAgreement == null) {
            throw new Error("Student does not have a Learning Agreement");
        }
        if ( student.learningAgreement.status != ApprovalStatus.ADMINISTRATION_PENDING){
            throw new Error("Student pre-approval is not in administration pending status");
        }
        if ( administrationApproved )
            student.learningAgreement.status = ApprovalStatus.APPROVED;
        else
            student.learningAgreement.status = ApprovalStatus.APPROVED;

        return true;
    }

    public static async approveStudentFCT(studentId : number, administrationId : number, administrationApproved: boolean): Promise<boolean> {
        const student = await StudentRepo.findStudentById(studentId);

        if (student == null) {
            throw new Error("Student does not exist");
        }
        if ( student.administration.id != administrationId) {
            throw new Error("Student is not assigned to this administration");
        }
        if (student.fct == null) {
            throw new Error("Student does not have a FCT");
        }
        if ( student.fct.status != FCTSatus.ADMINISTRATION_PENDING){
            throw new Error("Student pre-approval is not in administration pending status");
        }
        if ( administrationApproved )
            student.fct.status = FCTSatus.APPROVED;
        else
            student.fct.status = FCTSatus.ADMINISTRATION_REJECTED;
        
        return true;
    }

    public static async findAdministrationByDepartment(department : DepartmentType): Promise<Administration[] | null> {
        
        const administrationArray = await this._administrationRepository.find({
            where: {
                department: department
            },
            relations: {
                students: true
            }
        })
        if (administrationArray == null || administrationArray.length == 0) {
            throw new Error("There is no administration in this department or department is not valid");
        }

        return administrationArray;
    }

    public static async removeAdministrationById(id : number ): Promise<boolean> {
        const coordinatorToBeRemoved =  await AdministrationRepo.findAdministrationById(id);

        if (coordinatorToBeRemoved == null) {
            return false;
        }
        const coordinatorRepo = AppDataSource.getRepository(Administration);
        if ( coordinatorToBeRemoved != null) {

            // const PreApprovalRepo = AppDataSource.getRepository(PreApproval);
            // for (let i = 0; i < coordinator.preApprovals.length; i++) {
            //     await PreApprovalRepo.removePreApprovalById(coordinator.preApprovals[i].id);
            // }
            AdministrationRepo.findAdministrationByDepartment(coordinatorToBeRemoved.department).then((coordinators) => {
                if (coordinators == null) {
                    throw new Error("There is no coordinator in this department or department is not valid");
                }
                const coordinatorCount = coordinators.length - 1;
                var preApprovelCountToBeCopied = coordinatorToBeRemoved.students.length;
                var preApprovelCountToBeCopiedPerCoordinator = Math.floor(preApprovelCountToBeCopied / coordinatorCount);
                var preApprovelCountToBeCopiedRemainder = preApprovelCountToBeCopied % coordinatorCount;
                var preApprovelCountToBeCopiedPerCoordinatorArray = [];
                for (let i = 0; i < coordinatorCount; i++) {
                    preApprovelCountToBeCopiedPerCoordinatorArray.push(preApprovelCountToBeCopiedPerCoordinator);
                }
                for (let i = 0; i < preApprovelCountToBeCopiedRemainder; i++) {
                    preApprovelCountToBeCopiedPerCoordinatorArray[i] += 1;
                }
                var preApprovelCountToBeCopiedPerCoordinatorArrayIndex = 0;
                for (const coordinator of coordinators) {
                    if (coordinator.id != id) {
                        coordinator.students = coordinatorToBeRemoved.students.slice(0, preApprovelCountToBeCopiedPerCoordinatorArray[preApprovelCountToBeCopiedPerCoordinatorArrayIndex]);
                        preApprovelCountToBeCopiedPerCoordinatorArrayIndex += 1;
                    }
                }
                // for ( const coordinator of coordinators) {
                //     if (coordinator.id != id) {
                //         coordinator.preApprovals = coordinatorToBeRemoved.preApprovals;
                //         break;
                //     }
                // }
            })

        }
        await coordinatorRepo.remove(coordinatorToBeRemoved);
        return true;
    }
   
    //DONE
    public static async create(id : number, email: string, firstName: string, lastName: string, password: string, department: DepartmentType) : Promise<boolean | null> {
        var created = false;
        await AdministrationRepo.findAdministrationById(id).then(async (administration) => {
            if (administration != null) {
                throw new Error("Administration already exists");
            }
            else {
                const administrationRepo = AppDataSource.getRepository(Administration);
                const administration = new Administration();
                administration.id = id;
                administration.email = email;
                administration.firstName = firstName;
                administration.lastName = lastName;
                administration.password = password;
                administration.department = department;
                administration.students = [];
                administration.userType = UserType.ADMINISTRATION;
                
                await administrationRepo.save(administration).then((administration) => {
                    console.log("Administration has been saved to the database with id: " + administration.id);
                }).catch(() => {
                    throw Error("Administration could not be saved to the database with id: " + id);
                });
                created = true;
            }
        }).catch((err) => {
            throw err;
        });
        return created;
    }
}