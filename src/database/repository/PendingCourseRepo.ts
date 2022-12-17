import { AppDataSource } from "../data-source";
import { NotApprovedHostCourse } from "../entity/CoursesEntity/NotApprovedHostCourse";
import { PendingCourse } from "../entity/CoursesEntity/PendingCourse";
import { DepartmentType } from "../entity/UsersEntity/User";
import BilkentUniRepo from "./BilkentUniRepo";
import StudentRepo from "./StudentRepo";

export default class PendingCourseRepo{
    private static pendingCourseRepo = AppDataSource.getRepository(PendingCourse);

    public static async createPendingCourse(studentId: number) : Promise<boolean>{
        const student = await StudentRepo.findStudentById(studentId);
        
        if( !student ){
            return false;
        }
        if( student.preApproval == null ){
            return false;
        }
        for( const pendingCourse of student.preApproval.pendingCourses ){
            if( pendingCourse.bilkentCourse != null){
                return false;
            }
        }
        const pendingCourse = new PendingCourse();
        pendingCourse.notApprovedHostCourses = [];
        pendingCourse.instructorResponse = null;

        if( student.preApproval.pendingCourses == null || student.preApproval.pendingCourses.length == 0 ){
            student.preApproval.pendingCourses = [pendingCourse];
        }
        else{
            student.preApproval.pendingCourses.push(pendingCourse);
        }
        await PendingCourseRepo.pendingCourseRepo.save(pendingCourse);
        await StudentRepo.updateStudent(student);


        return true;
    }

    public static async addNotApprovedHostCourse(studentId: number, courseCode: string, courseName: string, courseCredit: number, studentMessage: string){
        const student = await StudentRepo.findStudentById(studentId);
        
        if( student == null || student.preApproval == null || student.preApproval.pendingCourses == null || student.preApproval.pendingCourses.length == 0 ){
            return false;
        }
        var previousPendingCourse : PendingCourse;
        for( const pendingCourse of student.preApproval.pendingCourses ){
            if ( pendingCourse.bilkentCourse == null ){
                previousPendingCourse = pendingCourse;
            }
            
        }
        if( previousPendingCourse == null ){
            return false;
        }
        
        const notApprovedHostCourse = new NotApprovedHostCourse();
        notApprovedHostCourse.code = courseCode;
        notApprovedHostCourse.name = courseName;
        notApprovedHostCourse.credit = courseCredit;
        notApprovedHostCourse.studentMessage = studentMessage;
        previousPendingCourse.notApprovedHostCourses.push(notApprovedHostCourse);
        await PendingCourseRepo.pendingCourseRepo.save(previousPendingCourse);
        return true;
    }

    public static async addBilkentCourse(studentId: number, bilkentCourseCode: string, bilkentCourseName: string){
        const student = await StudentRepo.findStudentById(studentId);
        
        if( student == null || student.preApproval == null || student.preApproval.pendingCourses == null || student.preApproval.pendingCourses.length == 0 ){
            return false;
        }
        var previousPendingCourse : PendingCourse = null;
        const bilkentCourseEquivalent = await BilkentUniRepo.getBilkentCourseByCodeAndName(student.department,bilkentCourseCode, bilkentCourseName);
        if( bilkentCourseEquivalent == null ){
            return false;
        }
        for( const pendingCourse of student.preApproval.pendingCourses ){
            if ( pendingCourse.bilkentCourse == null ){
                previousPendingCourse = pendingCourse;
            }
            if ( pendingCourse.bilkentCourse != null){
                if( pendingCourse.bilkentCourse.code == bilkentCourseCode && pendingCourse.bilkentCourse.name == bilkentCourseName ){
                    return false;
                }
            }
        }
        if( previousPendingCourse == null ){
            return false;
        }
        previousPendingCourse.bilkentCourse = bilkentCourseEquivalent;

        await PendingCourseRepo.pendingCourseRepo.save(previousPendingCourse);
        return true;
    }


    public static async removePendingCourse(studentId: number, bilkentCourseCode: string, bilkentCourseName: string) : Promise<boolean>{
        const student = await StudentRepo.findStudentById(studentId);
        if( student == null || student.preApproval == null || student.preApproval.pendingCourses == null || student.preApproval.pendingCourses.length == 0 ){
            return false;
        }
        var removingPendingCourse : PendingCourse = null;
        const bilkentCourseEquivalent = await BilkentUniRepo.getBilkentCourseByCodeAndName(student.department,bilkentCourseCode, bilkentCourseName);
        if( bilkentCourseEquivalent == null ){
            return false;
        }

        for( const pendingCourse of student.preApproval.pendingCourses ){
            if ( pendingCourse.bilkentCourse != null){
                if( pendingCourse.bilkentCourse.code == bilkentCourseCode && pendingCourse.bilkentCourse.name == bilkentCourseName ){
                    removingPendingCourse = pendingCourse;
                }
            }
        }
        if( removingPendingCourse == null ){
            return false;
        }

        student.preApproval.pendingCourses = student.preApproval.pendingCourses.filter( pendingCourse => pendingCourse.id != removingPendingCourse.id );
        await PendingCourseRepo.pendingCourseRepo.remove(removingPendingCourse);
        await StudentRepo.updateStudent(student);
        return true;
    }
    
    
}