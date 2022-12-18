import { AppDataSource } from "../data-source"
import { BilkentCourse, CourseType } from "../entity/CoursesEntity/BilkentCourse"
import { BilkentUniversity } from "../entity/SchoolEntity/BilkentUniversity";
import { DepartmentType } from "../entity/UsersEntity/User";


/// DONE 
/// 
export default class BilkentUniRepo{
    private static bilkentUniRepo  = AppDataSource.getRepository(BilkentUniversity);

    // params : department, courseCode, courseName, courseType, courseCredit
    // return : BilkentUniversity | null
    public static async addBilkentCourse(department : DepartmentType, courseCode: string, courseName: string, courseType: CourseType, courseCredit: number){
        var bilkentUni: BilkentUniversity;
        if (! await BilkentUniRepo.checkIfExistDepartment(department ) ) {
            // console.log("bilkentUni does not exist");
            bilkentUni = new BilkentUniversity();
            bilkentUni.deparment = department;
            bilkentUni.bilkentCourses = [];
        }
        else{
            bilkentUni = await BilkentUniRepo.getBilkentUniByDepartment(department);
        }

        const oldBilkentCourses = await BilkentUniRepo.getExistingBilkentCoursesByCode(department,courseCode);
        // console.log("oldBilkentCourse: ", oldBilkentCourse);

        if (oldBilkentCourses){
            for (const oldBilkentCourse of oldBilkentCourses){
               
                if ( oldBilkentCourse.courseType === CourseType.MANDATORY && oldBilkentCourse.courseType === CourseType.MANDATORY){
                    if ( oldBilkentCourse.code == courseCode){
                        // console.log("Course already exist");
                        return false;
                    }
                }
                else{
                    if ( oldBilkentCourse.code == courseCode){
                        // console.log("They are both elective courses");
                        if ( oldBilkentCourse.name === courseName){
                            // console.log("Elective Course(Ve karsiligi) already exist");
                            return false;
                        }
                    }
                }
            }
        }

        const bilkentCourse = new BilkentCourse();
        bilkentCourse.code = courseCode;
        bilkentCourse.name = courseName;
        bilkentCourse.courseType = courseType;
        bilkentCourse.credit = courseCredit;
        bilkentCourse.bilkentUniversity = bilkentUni;
        bilkentCourse.department = department;
        
        
        bilkentUni.bilkentCourses.push(bilkentCourse);

        await BilkentUniRepo.bilkentUniRepo.save(bilkentUni).catch((err) => {
            console.log(err);
        });

        return true;
        // return await BilkentUniRepo.bilkentUniRepo.save();
    }

    // params : department, courseType
    // return : BilkentCourse[] | null
    public static async getBilkentCoursesByCourseType(deparmentName : DepartmentType, courseType: CourseType) : Promise<BilkentCourse[] | null>{
        
        const bilkentUni = await BilkentUniRepo.getBilkentUniByDepartment(deparmentName);
        if (!bilkentUni){
            return null;
        }
        const bilkentCourses = bilkentUni.bilkentCourses.filter((bilkentCourse) => {
            return bilkentCourse.courseType === courseType;
        });
        return bilkentCourses;

    }

    // params : department, courseCode
    // return : BilkentCourse[] | null
    public static async getBilkentCoursesByCode(deparmentName : DepartmentType, courseCode: string) : Promise<BilkentCourse[] | null>{
        const bilkentCourses = await BilkentUniRepo.getExistingBilkentCoursesByCode(deparmentName, courseCode);

        if (!bilkentCourses){
            return null;
        }
        return bilkentCourses;
    }

    // params : department, courseCode, courseName
    // return : BilkentCourse | null
    public static async getBilkentCourseByCodeAndName(deparmentName : DepartmentType, courseCode: string, courseName: string) : Promise<BilkentCourse | null>{
        const bilkentCourses = await BilkentUniRepo.getExistingBilkentCoursesByCode(deparmentName, courseCode);
        if (!bilkentCourses){
            return null;
        }
        for ( const bilkentCourse of bilkentCourses){
            if (bilkentCourse.name === courseName){
                return bilkentCourse;
            }
        }
        return null;
    }

    // params : department
    // return : BilkentCourse[] | null
    public static async getAllBilkentCoursesByDepartment(deparment: DepartmentType): Promise<BilkentCourse[]|null>{

        const bilkentUni = await BilkentUniRepo.getBilkentUniByDepartment(deparment);
        if (!bilkentUni){
            return null;
        }
        return bilkentUni.bilkentCourses;
    }

    // params : None
    // return : BilkentUniversity[] | null
    public static async getAllBilkentCourses() : Promise<BilkentUniversity[]>{
        return await BilkentUniRepo.bilkentUniRepo.find();
    }

    // params : department, courseCode, courseName, courseType
    // return : boolean
    public static async removeBilkentCourse(department: DepartmentType, courseCode: string, courseName: string, courseType: CourseType): Promise<boolean>{
        const BilkentCourseRepo = AppDataSource.getRepository(BilkentCourse);
        const bilkentUni = await BilkentUniRepo.getBilkentUniByDepartment(department);
        if (!bilkentUni){
            return false;
        }

        const bilkentCourses = await BilkentUniRepo.getExistingBilkentCoursesByCode(department, courseCode);
        // console.log("bilkentCourses: ", bilkentCourses, "\n");
        if (!bilkentCourses){
            return false;
        }

        for (const bilkentCourse of bilkentCourses){
            // console.log("\nbilkentCourse: ", bilkentCourse, "\n");
            if (bilkentCourse.courseType === CourseType.MANDATORY && courseType === CourseType.MANDATORY){
                if (bilkentCourse.code === courseCode){
                    // console.log("BilkentCourse removed");
                    BilkentCourseRepo.remove(bilkentCourse);
                    bilkentUni.bilkentCourses = bilkentUni.bilkentCourses.filter((course) => course.code !== courseCode);
                    await BilkentUniRepo.bilkentUniRepo.save(bilkentUni);
                    return true;
                }
            }
            else if (bilkentCourse.courseType === CourseType.ELECTIVE && courseType === CourseType.ELECTIVE){
                if (bilkentCourse.code === courseCode){
                    if (bilkentCourse.name === courseName){
                        BilkentCourseRepo.remove(bilkentCourse);
                        bilkentUni.bilkentCourses = bilkentUni.bilkentCourses.filter((course) => (course.code !== courseCode && course.name !== courseName));
                        await BilkentUniRepo.bilkentUniRepo.save(bilkentUni);
                        return true;
                    }
                }
            }
        }

        return false;       
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //PRIVATE METHODS
    private static async checkIfExistDepartment(department : DepartmentType) : Promise<boolean>{
        const bilkentUni = await BilkentUniRepo.bilkentUniRepo.findOne({
            where: {
                deparment: department,
            },
        });

        
        if (!bilkentUni){
            return false;
        }
        return true;
    }

    private static async getExistingBilkentCoursesByCode(department : DepartmentType, courseCode: string) : Promise<BilkentCourse[]| null>{

        const bilkentUni = await BilkentUniRepo.getBilkentUniByDepartment(department);
        if (!bilkentUni){
            return null;
        }

        const bilkentCourseArray = [];

        for ( const bilcourse of bilkentUni.bilkentCourses){
            // console.log("bilcourse.code: ", bilcourse.code, "\n");
            if (bilcourse.code === courseCode){
                bilkentCourseArray.push(bilcourse);
            }
        }
        return bilkentCourseArray;
        // return null;
    }

    private static async getBilkentUniByDepartment(department : DepartmentType) : Promise<BilkentUniversity | null>{
        const bilkentUni = await BilkentUniRepo.bilkentUniRepo.findOne({
            where: {
                deparment: department,
            },
        });
        if (!bilkentUni){
            return null;
        }
        return bilkentUni;
    }

}