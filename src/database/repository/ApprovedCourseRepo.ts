import { AppDataSource } from "../data-source";
import { ApprovedCourse } from "../entity/CoursesEntity/ApprovedCourse";
import { ApprovedHostCourse } from "../entity/CoursesEntity/ApprovedHostCourse";
import { BilkentCourse, CourseType } from "../entity/CoursesEntity/BilkentCourse";
import { School } from "../entity/SchoolEntity/School";
import { DepartmentType } from "../entity/UsersEntity/User";
import BilkentUniRepo from "./BilkentUniRepo";
import SchoolRepo from "./SchoolRepo";

export default class ApprovedCourseRepo{

    private static approvedCourseRepo = AppDataSource.getRepository(ApprovedCourse);

    public static async createApprovedCourse(schoolName : string, department: DepartmentType) : Promise<boolean>{
        const approvedCourse = new ApprovedCourse();
        const schoolRepository = AppDataSource.getRepository(School)
        const school = await SchoolRepo.getSchoolByNameAndDepartment(schoolName, department)
        if( !school ){
            return false;
        }
        const previousApprovedCourses = await ApprovedCourseRepo.getApprovedCoursesBySchoolAndDepartment(schoolName, department);

        for (const course of previousApprovedCourses) {
            if(!course.bilkentCourse || course.approvedHostCourses.length == 0){
                return false;
            }
        }
        school.approvedCourses.push(approvedCourse);
        approvedCourse.school = school;
        approvedCourse.approvedHostCourses = [];
        approvedCourse.bilkentCourse = null;
        approvedCourse.department = department;
        await ApprovedCourseRepo.approvedCourseRepo.save(approvedCourse);
        await schoolRepository.save(school).catch((err) => {
            throw new Error(err);
        });
        return true;
    }
    
    public static async checkIfApprovedCourseExistInDatabase(approvedCourse: ApprovedCourse) : Promise<boolean>{
        const approvedCourses = await ApprovedCourseRepo.approvedCourseRepo.find({
            where: {
                department: approvedCourse.department,
                school: {
                    name: approvedCourse.school.name,
                    department: approvedCourse.department
                }
            },
        })
        var checkBilkentCourse = false;
        var checkHostCourses = false;
        for ( const course of approvedCourses) {
            if( course.bilkentCourse && course.approvedHostCourses.length > 0){
                checkBilkentCourse =  true;
            }
            for ( const approvedHostCourse of course.approvedHostCourses) {
                if( approvedHostCourse.code == approvedCourse.bilkentCourse.code && approvedHostCourse.name == approvedCourse.bilkentCourse.name){
                    checkHostCourses =  true;
                }
            }
        }
        return checkHostCourses && checkBilkentCourse;
    }

    public static async getApprovedCoursesBySchoolAndDepartment(schoolName : string, deparment: DepartmentType): Promise<ApprovedCourse[] | null>{
        const approvedCourses = await ApprovedCourseRepo.approvedCourseRepo.find({
            where: {
                department: deparment,
                school: {
                    name: schoolName,
                    department: deparment
                }
            },
        })
        return approvedCourses;
    }
    
    public static async addApprovedHostCourse(schoolName : string, department: DepartmentType, courseCode: string, courseName: string, courseCredit: number){
        const school = await SchoolRepo.getSchoolByNameAndDepartment(schoolName, department)
        if( !school ){
            return false;
        }
        const approvedCourses = await ApprovedCourseRepo.getApprovedCoursesBySchoolAndDepartment(schoolName, department);
        for ( const course of approvedCourses) {
            for ( const approvedHostCourse of course.approvedHostCourses) {
                if( approvedHostCourse.code == courseCode && approvedHostCourse.name == courseName){
                    return false;
                }
            }
        }
        for ( const course of approvedCourses) {
            if( !course.bilkentCourse ){
                const approvedHostCourse = new ApprovedHostCourse();
                approvedHostCourse.code = courseCode;
                approvedHostCourse.name = courseName;
                approvedHostCourse.credit = courseCredit;
                approvedHostCourse.department = department;
                
                course.approvedHostCourses.push(approvedHostCourse);
                
                await ApprovedCourseRepo.approvedCourseRepo.save(course);
                return true;
            }
        }
        return false;
    }


    public static async addBilkentCourse(schoolName : string, department: DepartmentType, courseCode: string, courseName: string){
        // const schoolRepository = AppDataSource.getRepository(School)
        const school = await SchoolRepo.getSchoolByNameAndDepartment(schoolName, department)
        if( !school ){
            return false;
        }
        const approvedCourses = await ApprovedCourseRepo.getApprovedCoursesBySchoolAndDepartment(schoolName, department);
        for ( const course of approvedCourses) {
            if( course.bilkentCourse != null){
                if ( course.bilkentCourse.code == courseCode && course.bilkentCourse.name == courseName){
                    return false;
                }
            }
        }
        for ( const course of approvedCourses) {
            if( !course.bilkentCourse ){
                const bilkentCourse = await BilkentUniRepo.getBilkentCourseByCodeAndName(department,courseCode, courseName);
                if( !bilkentCourse ){
                    return false;
                }
                course.bilkentCourse = bilkentCourse;
                await ApprovedCourseRepo.approvedCourseRepo.save(course);
                return true;
            }
        } 
        return false;
    }

    public static async removeApprovedCourse(schoolName : string, department: DepartmentType, bilkentCourseCode: string, bilkentCourseName: string) : Promise<boolean>{
        const schoolRepository = AppDataSource.getRepository(School)
        const school = await SchoolRepo.getSchoolByNameAndDepartment(schoolName, department)
        if( !school ){
            return false;
        }
        const previousApprovedCourses = await ApprovedCourseRepo.getApprovedCoursesBySchoolAndDepartment(schoolName, department);

        var removeApprovedCourse = null;
        for (const course of previousApprovedCourses) {
            if( course.bilkentCourse != null ) {
                if ( course.bilkentCourse.code == bilkentCourseCode && course.bilkentCourse.name == bilkentCourseName){
                    removeApprovedCourse = course;
                }
            }
        }

        if ( removeApprovedCourse == null )
            return false;

        const approvedHostCourseRepository = AppDataSource.getRepository(ApprovedHostCourse)
        school.approvedCourses = school.approvedCourses.filter((course) => {
            if( course.bilkentCourse && course.bilkentCourse.code == bilkentCourseCode && course.bilkentCourse.name == bilkentCourseName){
                return false;
            }
            return true;
        });

        for ( const approvedHostCourse of removeApprovedCourse.approvedHostCourses ) {
            await approvedHostCourseRepository.remove(approvedHostCourse).catch((err) => {
                throw new Error("Error in removing approved host course:  " + err);
            }); 
        }
       
        // console.log("school.approvedCourses:",school.approvedCourses);
        await ApprovedCourseRepo.approvedCourseRepo.remove(removeApprovedCourse).catch((err) => {
            throw new Error("Error in removing approved course:  " + err);
        });
        // console.log("\nApproved Course Deleted\n");
        await schoolRepository.save(school).catch((err) => {
            throw new Error("Error in saving school:  " + err);
        });
        return true;
    }
}