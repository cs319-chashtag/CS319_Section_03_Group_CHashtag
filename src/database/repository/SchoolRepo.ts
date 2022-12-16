import { Interface } from "readline";
import { AppDataSource } from "../data-source";
import { ApprovedCourse } from "../entity/CoursesEntity/ApprovedCourse";
import { ApprovedHostCourse } from "../entity/CoursesEntity/ApprovedHostCourse";
import { BilkentCourse, CourseType } from "../entity/CoursesEntity/BilkentCourse";
import { School } from "../entity/SchoolEntity/School";
import { DepartmentType } from "../entity/UsersEntity/User";

/// All methods in SchoolRepo
interface SchoolRepoInterface {
    create(name: string, department: DepartmentType): Promise<boolean | null>;
    addDepartment(name: string, department: DepartmentType): Promise<boolean | null>;
    removeDepartment(name: string, department: DepartmentType): Promise<boolean | null>;
    addApprovedCourse(name: string, department: DepartmentType, course: BilkentCourse): Promise<boolean | null>;
    removeApprovedCourse(name: string, department: DepartmentType, course: BilkentCourse): Promise<boolean | null>;
    getApprovedCoursesByNameAndDepartment(name: string, department: DepartmentType): Promise<ApprovedCourse[] | null>;
    getSchoolsByName(name: string): Promise<School[] | null>;
    getSchoolsByDepartment(department: DepartmentType): Promise<School[] | null>;
    getSchoolByNameAndDepartment(name: string, department: DepartmentType): Promise<School | null>;
    getAllSchools(): Promise<School[] | null>;
    removeSchool(name: string): Promise<boolean | null>;
}


export default class SchoolRepo{

    //PRIVATE METHOD
    private static async checkDepartmentExist(name: string, departmentName: DepartmentType): Promise<boolean | null> {
        const schoolRepository = AppDataSource.getRepository(School)
    
        const schools = await SchoolRepo.getSchoolsByName(name);

        if (schools == null) {
            return false;
        }
        for( let school of schools){
            if (school.department === departmentName) {
                return true;
            }
        }
        return false;
    }

    public static async create(name: string, department: DepartmentType): Promise<boolean | null> {
        const schoolRepository = AppDataSource.getRepository(School)        
        const check = await SchoolRepo.checkDepartmentExist(name, department);

        if( check == true){
            return false;
        }
        
        const newSchool = new School();
        newSchool.name = name;
        newSchool.department = department;
        newSchool.approvedCourses = [];
        await schoolRepository.save(newSchool).catch((err) => {
            throw new Error(err);
        });
        return true;
    }

    public static async addDepartment(name: string, department: DepartmentType): Promise<boolean | null> {
        const schoolRepository = AppDataSource.getRepository(School)
        
        const check = await SchoolRepo.checkDepartmentExist(name, department);

        if( check == true){
            return false;
        }

        const newSchool = new School();
        newSchool.name = name;
        newSchool.department = department;
        newSchool.approvedCourses = [];
        await schoolRepository.save(newSchool).catch((err) => {
            throw new Error(err);
        });
        return true;
    }

    public static async removeDepartment(name: string, department: DepartmentType): Promise<boolean | null> {
        
        const schoolRepository = AppDataSource.getRepository(School)

        const check = await SchoolRepo.checkDepartmentExist(name, department);

        if( check == false){
            return false;
        }

        const schools = await SchoolRepo.getSchoolsByName(name);
        for( let school of schools){
            if (school.department === department) {
                schoolRepository.remove(school).catch((err) => {
                    throw new Error(err);
                });
            }
        }
        return true;
    }

    public static async addApprovedCourse(name: string, department: DepartmentType, approvedCourse: ApprovedCourse): Promise<boolean | null> {
        const check = await SchoolRepo.checkDepartmentExist(name, department);

        if( check == false){
            return false;
        }

        // console.log( "ApprovedCourse: ", approvedCourse );
        const schoolRepository = AppDataSource.getRepository(School)
        const school = await SchoolRepo.getSchoolByNameAndDepartment(name,department);

        // if (school.department === department && !school.approvedCourses.includes(approvedCourse)){
        //     console.log( "DONE" );
        // }
        // console.log( "ARPPVOED COURSE SCHOOL: ", approvedCourse.school, " SCHOOL: ", school );
        // if (approvedCourse.school == school){
        //     console.log( "WELL DONE" );
        // }
        // // console.log("ApprovedCourse.school: ", approvedCourse.school, " ApprovedCourse.bilkentCourse: ", approvedCourse.bilkentCourse);
        
        // for ( let course of school.approvedCourses){
        //     if (course.bilkentCourse.id === approvedCourse.bilkentCourse.id){
               
        //         return false;
        //     }

        // }

        // console.log( "school.approvedCourses: ", school.approvedCourses, "\n approvedCourse: ", approvedCourse , "\n");
        for ( let courseApproved of school.approvedCourses){
            var bilkentCourseCompare = false;
            if ( courseApproved.bilkentCourse.courseType == CourseType.MANDATORY && courseApproved.bilkentCourse.courseType){
                if ( courseApproved.bilkentCourse.code == approvedCourse.bilkentCourse.code){
                    bilkentCourseCompare = true;
                }
            }
            
            for( let hostCourse of courseApproved.approvedHostCourses){
                var hostCourseCompare = false;
                for (let newHostCourse of approvedCourse.approvedHostCourses){
                    if ( hostCourse.code == newHostCourse.code){
                        hostCourseCompare = true;
                        break;
                    }
                }
                if ( hostCourseCompare == false){
                    break;
                }
            }
        }
        if ( bilkentCourseCompare == true && hostCourseCompare == true){
            console.log( "COURSE HAS ALREADY HERE" );
            return false;
        }

        // console.log( "IF: ",school.approvedCourses.includes(approvedCourse));
        if (school.department === department && approvedCourse.school.id === school.id) {
            // console.log("School department: ", school.department, " Department: ", department, " ApprovedCourse.school ", approvedCourse.school);
            school.approvedCourses.push(approvedCourse);
            await schoolRepository.save(school).catch((err) => {
                throw new Error(err);
            });
            return true;
        }
        return false;
    }

    public static async removeApprovedCourse(name: string, department: DepartmentType, approvedCourse: ApprovedCourse): Promise<boolean | null> {
        const check = await SchoolRepo.checkDepartmentExist(name, department);

        if( check == false){
            return false;
        }

        const arrayOfApprovedCourses = await SchoolRepo.getApprovedCoursesByNameAndDepartment(name, DepartmentType.CS);
        if ( arrayOfApprovedCourses == null || arrayOfApprovedCourses.length == 0){
            return false;
        }

        // console.log( "ApprovedCourse: ", approvedCourse );
        const schoolRepository = AppDataSource.getRepository(School)
        const school = await SchoolRepo.getSchoolByNameAndDepartment(name,department);

        // const index = school.approvedCourses.indexOf(approvedCourse);
        // console.log( "index: ", index );
        var whichApprovedCourse = approvedCourse;
        for ( let courseApproved of school.approvedCourses){
            whichApprovedCourse = courseApproved;
            var bilkentCourseCompare = false;
            if ( courseApproved.bilkentCourse.courseType == CourseType.MANDATORY && courseApproved.bilkentCourse.courseType){
                if ( courseApproved.bilkentCourse.code == approvedCourse.bilkentCourse.code){
                    bilkentCourseCompare = true;
                }
            }
            
            for( let hostCourse of courseApproved.approvedHostCourses){
                var hostCourseCompare = false;
                for (let newHostCourse of approvedCourse.approvedHostCourses){
                    if ( hostCourse.code == newHostCourse.code){
                        hostCourseCompare = true;
                        break;
                    }
                }
                if ( hostCourseCompare == false){
                    break;
                }
            }
        }
        if( bilkentCourseCompare != true || hostCourseCompare != true ){
            console.log( "THERE IS NO COURSE" );
            return false;
        }


        console.log("approvedCourse:\n", approvedCourse.id);
        console.log("------------------------");
        console.log("whichCourseApproved: \n", whichApprovedCourse.id);
        console.log("SUCCESS");

        // return false;

        if (school.department === department) {
            const approvedCoursesRepository = AppDataSource.getRepository(ApprovedCourse);
            const hostCourseRepostiory = AppDataSource.getRepository(ApprovedHostCourse);
            for ( let hostCourse of whichApprovedCourse.approvedHostCourses){
                await hostCourseRepostiory.remove(hostCourse).catch((err) => {
                    throw new Error(err);
                });
            }
            await approvedCoursesRepository.remove(whichApprovedCourse).catch((err) => {
                throw new Error(err);
            });
            school.approvedCourses.splice(school.approvedCourses.indexOf(whichApprovedCourse), 1);
            await schoolRepository.save(school).catch((err) => {
                throw new Error(err);
            });
            return true;
        }
        return false;
    }

    public static async getApprovedCoursesByNameAndDepartment(name: string, departmentName: DepartmentType): Promise<ApprovedCourse[] | null> {
        const schoolRepository = AppDataSource.getRepository(School)

        const schools = await SchoolRepo.getSchoolsByName(name);

        if (schools == null) {
            return null;
        }
        for ( let school of schools){
            if (school.department === departmentName) {
                return school.approvedCourses;
            }
        };
        return null;
    }

    public static async getSchoolsByName(name: string): Promise<School[] | null> {
        const schoolRepository = AppDataSource.getRepository(School)
    
        const school = await schoolRepository.find({
            where: {
                name: name
            },
            relations: {
                approvedCourses: true
            }
        }).catch((err) => {
            return null;
        });
        return school;
    }

    public static async getSchoolsByDepartment(departmentName: DepartmentType): Promise<School[] | null> {
        const schoolRepository = AppDataSource.getRepository(School)

        const schools = await schoolRepository.find({
            where: {
                department: departmentName
            },
            relations: {
                approvedCourses: true
            }
        }).catch((err) => {
            return null;
        });
        return schools;
    }

    public static async getSchoolByNameAndDepartment(name: string, departmentName: DepartmentType): Promise<School | null> {
        const schoolRepository = AppDataSource.getRepository(School)

        const school = await schoolRepository.findOne({
            where: {
                name: name,
                department: departmentName
            },
            relations: {
                approvedCourses: true
            }
        }).catch((err) => {
            return null;
        });
        return school;
    }

    public static async getAllSchools(): Promise<School[] | null> {
        const schoolRepository = AppDataSource.getRepository(School)
    
        const schools = await schoolRepository.find({
            relations: {
                approvedCourses: true
            }
        }).catch((err) => {
            return null;
        });
        return schools;
    }

    public static async removeSchool(schoolName: string): Promise<boolean | null> {
        const schoolRepository = AppDataSource.getRepository(School)
    
        const schools = await SchoolRepo.getSchoolsByName(schoolName);

        if (schools == null) {
            return false;
        }
        for ( let school of schools){
            schoolRepository.remove(school).catch((err) => {
                throw new Error(err);
            });
        };
        return true;
    }
}