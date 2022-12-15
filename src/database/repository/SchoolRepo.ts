import { AppDataSource } from "../data-source";
import { School } from "../entity/SchoolEntity/School";

export default class SchoolRepo {
    
    public static async getSchoolByName(name: string): Promise<School | null> {
        const schoolRepository = AppDataSource.getRepository(School)
    
        const school = await schoolRepository.findOne({
            where: {
                name: name
            },
            relations: {
                approvedCourses: true
            }
        }).catch((err) => {
            throw new Error(err);
        });
        if (school == null) {
            throw new Error("School not found");
        }
        return school;
    }

}