import { AppDataSource } from "../data-source"
import { PreApproval } from "../entity/ApprovalsEntity/PreApproval"
import { Coordinator } from "../entity/UsersEntity/Coordinator"


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

    public static async findCoordinatorByDepartment(department : string): Promise<Coordinator[] | null> {
        const coordinatorRepository = AppDataSource.getRepository(Coordinator)
        
        const coordinatorArray = await coordinatorRepository.find({
            where: {
                department: department
            },
            relations: {
                preApprovals: true
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
        if ( coordinatorToBeRemoved.preApprovals != null) {

            // const PreApprovalRepo = AppDataSource.getRepository(PreApproval);
            // for (let i = 0; i < coordinator.preApprovals.length; i++) {
            //     await PreApprovalRepo.removePreApprovalById(coordinator.preApprovals[i].id);
            // }
            CoordinatorRepo.findCoordinatorByDepartment(coordinatorToBeRemoved.department).then((coordinators) => {
                if (coordinators == null) {
                    throw new Error("There is no coordinator in this department or department is not valid");
                }
                const coordinatorCount = coordinators.length - 1;
                var preApprovelCountToBeCopied = coordinatorToBeRemoved.preApprovals.length;
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
                        coordinator.preApprovals = coordinatorToBeRemoved.preApprovals.slice(0, preApprovelCountToBeCopiedPerCoordinatorArray[preApprovelCountToBeCopiedPerCoordinatorArrayIndex]);
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
   
}