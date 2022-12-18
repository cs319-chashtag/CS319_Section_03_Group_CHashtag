import { AppDataSource } from "../data-source"
import { FCTSatus as FCTStatus } from "../entity/ApprovalsEntity/FCT"
import { ApprovalStatus, PreApproval } from "../entity/ApprovalsEntity/PreApproval"
import { Coordinator } from "../entity/UsersEntity/Coordinator"
import { DepartmentType, UserType } from "../entity/UsersEntity/User"
import StudentRepo from "./StudentRepo"


export default class CoordinatorRepo {

    //DONE
    public static async findCoordinatorById(id : number): Promise<Coordinator | null> {
        const coordinatorRepository = AppDataSource.getRepository(Coordinator)

        return coordinatorRepository.findOne({
            where: {
                id: id
            },
            // relations: {
            //     // preApproval: {
            // }
        })
    }

    public static async findCoordinatorByDepartment(department : DepartmentType): Promise<Coordinator[] | null> {
        const coordinatorRepository = AppDataSource.getRepository(Coordinator)
        
        const coordinatorArray = await coordinatorRepository.find({
            where: {
                department: department
            },
            relations: {
                students: true
            }
        })
        if (coordinatorArray == null || coordinatorArray.length == 0) {
            throw new Error("There is no coordinator in this department or department is not valid");
        }

        return coordinatorArray;
    }

    public static async removeCoordinatorById(id : number ): Promise<boolean> {
        const coordinatorToBeRemoved =  await CoordinatorRepo.findCoordinatorById(id);

        if (coordinatorToBeRemoved == null) {
            return false;
        }
        const coordinatorRepo = AppDataSource.getRepository(Coordinator);
        if ( coordinatorToBeRemoved != null) {

            // const PreApprovalRepo = AppDataSource.getRepository(PreApproval);
            // for (let i = 0; i < coordinator.preApprovals.length; i++) {
            //     await PreApprovalRepo.removePreApprovalById(coordinator.preApprovals[i].id);
            // }
            CoordinatorRepo.findCoordinatorByDepartment(coordinatorToBeRemoved.department).then((coordinators) => {
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

    public static async approveStudentPreApproval(studentId : number, coordinatorId : number, coordinatorApproved: boolean): Promise<boolean> {
        const student = await StudentRepo.findStudentById(studentId);

        if (student == null) {
            throw new Error("Student does not exist");
        }
        if ( student.coordinator.id != coordinatorId) {
            throw new Error("Student is not assigned to this coordinator");
        }
        if (student.preApproval == null) {
            throw new Error("Student does not have a pre-approval");
        }
        if ( student.preApproval.status != ApprovalStatus.COORDINATOR_PENDING){
            throw new Error("Student pre-approval is not in pending status");
        }
        if ( coordinatorApproved )
            student.preApproval.status = ApprovalStatus.ADMINISTRATION_PENDING;
        else
            student.preApproval.status = ApprovalStatus.COORDINATOR_REJECTED;

        return true;
    }

    public static async approveStudentLA(studentId : number, coordinatorId : number, coordinatorApproved: boolean): Promise<boolean> {
        const student = await StudentRepo.findStudentById(studentId);

        if (student == null) {
            throw new Error("Student does not exist");
        }
        if ( student.coordinator.id != coordinatorId) {
            throw new Error("Student is not assigned to this coordinator");
        }
        if (student.learningAgreement == null) {
            throw new Error("Student does not have a Learning Agreement");
        }
        if ( student.learningAgreement.status != ApprovalStatus.COORDINATOR_PENDING){
            throw new Error("Student pre-approval is not in administration pending status");
        }
        if ( coordinatorApproved )
            student.fct.status = FCTStatus.ADMINISTRATION_PENDING;
        else
            student.fct.status = FCTStatus.COORDINATOR_REJECTED;
        
        return true;
    }

    public static async approveStudentFCT(studentId : number, coordinatorId : number, coordinatorApproved: boolean): Promise<boolean> {
        const student = await StudentRepo.findStudentById(studentId);

        if (student == null) {
            throw new Error("Student does not exist");
        }
        if ( student.coordinator.id != coordinatorId) {
            throw new Error("Student is not assigned to this coordinator");
        }
        if (student.fct == null) {
            throw new Error("Student does not have a FCT");
        }
        if ( student.fct.status != FCTStatus.COORDINATOR_PENDING){
            throw new Error("Student pre-approval is not in administration pending status");
        }
        if ( coordinatorApproved )
            student.fct.status = FCTStatus.ADMINISTRATION_PENDING;
        else
            student.fct.status = FCTStatus.COORDINATOR_REJECTED;
        
        return true;
    }

    //DONE
    public static async create(id : number, email: string, firstName: string, lastName: string, password: string, department: DepartmentType) : Promise<boolean | null> {
        var created = false;
        await CoordinatorRepo.findCoordinatorById(id).then(async (coordinator) => {
            if (coordinator != null) {
                throw new Error("Coordinator already exists");
            }
            else {
                const coordinatorRepository = AppDataSource.getRepository(Coordinator);
                const coordinator = new Coordinator();
                coordinator.id = id;
                coordinator.email = email;
                coordinator.firstName = firstName;
                coordinator.lastName = lastName;
                coordinator.password = password;
                coordinator.department = department;
                coordinator.students = [];

                coordinator.userType = UserType.COORDINATOR;
                
                await coordinatorRepository.save(coordinator).then((coordinator) => {
                    console.log("Coordinator has been saved to the database with id: " + coordinator.id);
                }).catch(() => {
                    throw Error("Coordinator could not be saved to the database with id: " + id);
                });
                created = true;
            }
        }).catch((err) => {
            throw err;
        });
        return created;
    }
   
}