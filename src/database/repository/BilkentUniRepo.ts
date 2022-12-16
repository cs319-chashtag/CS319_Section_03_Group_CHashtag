import { AppDataSource } from "../data-source"
import { BilkentCourse, CourseType } from "../entity/CoursesEntity/BilkentCourse"
import { BilkentUniversity } from "../entity/SchoolEntity/BilkentUniversity";
import { DepartmentType } from "../entity/UsersEntity/User";

export default class BilkentUniRepo{
    private static bilkentUniRepo  = AppDataSource.getRepository(BilkentUniversity);

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

    private static async getExistingBilkentCourseByCode(department : DepartmentType, courseCode: string) : Promise<BilkentCourse| null>{

        const bilkentUni = await BilkentUniRepo.getBilkentUniByDepartment(department);
        if (!bilkentUni){
            return null;
        }

        for ( const course of bilkentUni.bilkentCourses){
            if (course.code === courseCode){
                return course;
            }
        }
        return null;
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

    public static async addBilkentCourse(department : DepartmentType, courseCode: string, courseName: string, courseType: CourseType, courseCredit: number){
        var bilkentUni: BilkentUniversity;

        if (!BilkentUniRepo.checkIfExistDepartment(department) ) {
            bilkentUni = new BilkentUniversity();
            bilkentUni.deparment = department;
        }

        bilkentUni = await BilkentUniRepo.getBilkentUniByDepartment(department);

        const bilkenCourse = await BilkentUniRepo.getExistingBilkentCourseByCode(department,courseCode);
        if (!bilkenCourse)
            return false;

        const bilkentCourse = new BilkentCourse();
        bilkentCourse.code = courseCode;
        bilkentCourse.name = courseName;
        bilkentCourse.courseType = courseType;
        bilkentCourse.credit = courseCredit;
        bilkentCourse.bilkentUniversity = bilkentUni;

        await BilkentUniRepo.bilkentUniRepo.save(bilkentUni).catch((err) => {
            console.log(err);
        });

        return true;
        // return await BilkentUniRepo.bilkentUniRepo.save();
    }

    public static async getBilkentCourseByCode(deparmentName : DepartmentType, courseCode: string) : Promise<BilkentCourse | null>{
        const bilkentCourse = await BilkentUniRepo.getExistingBilkentCourseByCode(deparmentName, courseCode);

        if (!bilkentCourse){
            return null;
        }
        return bilkentCourse;
    }

    public static async getAllBilkentCoursesByDepartment(deparment: DepartmentType): Promise<BilkentCourse[]>{

        const bilkentUni = await BilkentUniRepo.getBilkentUniByDepartment(deparment);
        if (!bilkentUni){
            return [];
        }
        return bilkentUni.bilkentCourses;
    }

    public static async getAllBilkentCourses() : Promise<BilkentUniversity[]>{
        return await BilkentUniRepo.bilkentUniRepo.find();
    }

    public static async removeBilkentCourse(department: DepartmentType, courseCode: string, courseName: string, courseType: CourseType, courseCredit: number): Promise<boolean>{
        const bilkentUni = await BilkentUniRepo.getBilkentUniByDepartment(department);
        if (!bilkentUni){
            return false;
        }

        const bilkentCourse = await BilkentUniRepo.getExistingBilkentCourseByCode(department, courseCode);

        if (!bilkentCourse){
            return false;
        }

        bilkentUni.bilkentCourses = bilkentUni.bilkentCourses.filter((course) => {
            return course.code !== courseCode;
        });

        await BilkentUniRepo.bilkentUniRepo.save(bilkentUni).catch((err) => {
            console.log(err);
        });

        return false;       
    }
}