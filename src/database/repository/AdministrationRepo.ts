import { Repository } from "typeorm";
import { AppDataSource } from "../data-source"
import { Administration } from "../entity/UsersEntity/Administration";
import { DepartmentType, UserType } from "../entity/UsersEntity/User"


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