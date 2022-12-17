import { AppDataSource } from "../data-source";
import { ApprovalStatus, PreApproval } from "../entity/ApprovalsEntity/PreApproval";
import { ApprovedCourse } from "../entity/CoursesEntity/ApprovedCourse";
import { BilkentCourse, CourseType } from "../entity/CoursesEntity/BilkentCourse";
import { PendingCourse } from "../entity/CoursesEntity/PendingCourse";
import ApprovedCourseRepo from "./ApprovedCourseRepo";
import StudentRepo from "./StudentRepo";

export default class PreApprovalRepo{
    private static preApprovalRepo = AppDataSource.getRepository(PreApproval);

    public static async createPreApproval(studentId: number) : Promise<boolean>{
        const preApproval = new PreApproval();
        preApproval.pendingCourses = [];
        preApproval.approvedCourses = [];
        preApproval.totalCredit = 0;
        preApproval.studentId = studentId;
        await PreApprovalRepo.preApprovalRepo.save(preApproval);
        return true;
    }

    public static async addApprovedCourse(studentId: number, approvedCourse : ApprovedCourse ){
        const student = await StudentRepo.findStudentById(studentId);
        
        if( student == null || student.preApproval == null ){
            return false;
        }
        for ( const course of student.preApproval.approvedCourses ){
            if ( course.bilkentCourse.courseType == CourseType.MANDATORY && approvedCourse.bilkentCourse.courseType == CourseType.MANDATORY ){
                if ( course.bilkentCourse.code == approvedCourse.bilkentCourse.code ){
                    return false;
                }
            }
            else if ( course.bilkentCourse.courseType == CourseType.ELECTIVE && approvedCourse.bilkentCourse.courseType == CourseType.ELECTIVE ){
                if ( course.bilkentCourse.code == approvedCourse.bilkentCourse.code ){
                    return false;
                }
            }
        }
        student.preApproval.approvedCourses.push(approvedCourse);
        await PreApprovalRepo.preApprovalRepo.save(student.preApproval);
        return true;

        // const approvedCourse = await ApprovedCourseRepo.createApprovedCourse(hostCourseCode, hostCourseName);
        // student.preApproval.approvedCourses.push(approvedCourse);
        // await PreApprovalRepo.preApprovalRepo.save(student.preApproval);
    }

    public static async checkBilkentCourse(studentId: number, bilkentCourseCode : string, bilkentCourseName : string) : Promise<boolean>{
        const student = await StudentRepo.findStudentById(studentId);

        if ( student == null || student.preApproval == null ){
            return false;
        }
        for ( const course of student.preApproval.approvedCourses ){
            if ( course.bilkentCourse.code == bilkentCourseCode && course.bilkentCourse.name == bilkentCourseName ){
                return true;
            }
        }
        for ( const course of student.preApproval.pendingCourses ){
            if ( course.bilkentCourse.code == bilkentCourseCode && course.bilkentCourse.name == bilkentCourseName ){
                return true;
            }
        }
        return false;
    }

    public static async addPendingCourse(studentId: number, pendingCourse : PendingCourse ) : Promise<boolean>{
        const student = await StudentRepo.findStudentById(studentId);
        
        if( student == null || student.preApproval == null ){
            return false;
        }
        for ( const course of student.preApproval.pendingCourses ){
            if ( course.bilkentCourse.courseType == CourseType.MANDATORY && pendingCourse.bilkentCourse.courseType == CourseType.MANDATORY ){
                if ( course.bilkentCourse.code == pendingCourse.bilkentCourse.code ){
                    return false;
                }
            }
            else if ( course.bilkentCourse.courseType == CourseType.ELECTIVE && pendingCourse.bilkentCourse.courseType == CourseType.ELECTIVE ){
                if ( course.bilkentCourse.code == pendingCourse.bilkentCourse.code ){
                    return false;
                }
            }
        }
        student.preApproval.pendingCourses.push(pendingCourse);
        await PreApprovalRepo.preApprovalRepo.save(student.preApproval);
        return true;
    }


    public static async removeApprovedCourse(studentId: number, approvedCourse : ApprovedCourse ) : Promise<boolean>{
        const student = await StudentRepo.findStudentById(studentId);
        
        if( student == null || student.preApproval == null ){
            return false;
        }
        for ( const course of student.preApproval.approvedCourses ){
            if ( course.bilkentCourse.courseType == CourseType.MANDATORY && approvedCourse.bilkentCourse.courseType == CourseType.MANDATORY ){
                if ( course.bilkentCourse.code == approvedCourse.bilkentCourse.code ){
                    student.preApproval.approvedCourses.splice(student.preApproval.approvedCourses.indexOf(course), 1);
                    await PreApprovalRepo.preApprovalRepo.save(student.preApproval);
                    return true;
                }
            }
            else if ( course.bilkentCourse.courseType == CourseType.ELECTIVE && approvedCourse.bilkentCourse.courseType == CourseType.ELECTIVE ){
                if ( course.bilkentCourse.code == approvedCourse.bilkentCourse.code ){
                    student.preApproval.approvedCourses.splice(student.preApproval.approvedCourses.indexOf(course), 1);
                    await PreApprovalRepo.preApprovalRepo.save(student.preApproval);
                    return true;
                }
            }
        }
        return false;
    }

    public static async removePendingCourse(studentId: number, pendingCourse : PendingCourse ) : Promise<boolean>{
        const student = await StudentRepo.findStudentById(studentId);

        if( student == null || student.preApproval == null ){
            return false;
        }
        for ( const course of student.preApproval.pendingCourses ){
            if ( course.bilkentCourse.courseType == CourseType.MANDATORY && pendingCourse.bilkentCourse.courseType == CourseType.MANDATORY ){
                if ( course.bilkentCourse.code == pendingCourse.bilkentCourse.code ){
                    student.preApproval.pendingCourses.splice(student.preApproval.pendingCourses.indexOf(course), 1);
                    await PreApprovalRepo.preApprovalRepo.save(student.preApproval);
                    return true;
                }
            }
            else if ( course.bilkentCourse.courseType == CourseType.ELECTIVE && pendingCourse.bilkentCourse.courseType == CourseType.ELECTIVE ){
                if ( course.bilkentCourse.code == pendingCourse.bilkentCourse.code ){
                    student.preApproval.pendingCourses.splice(student.preApproval.pendingCourses.indexOf(course), 1);
                    await PreApprovalRepo.preApprovalRepo.save(student.preApproval);
                    return true;
                }
            }
        }
        return false;
    }

    //DONE
    public static async setPreApprovalStatusCoordinator(studentId : number): Promise<boolean> {
        const student = await StudentRepo.findStudentById(studentId);
        
        if ( student == null || student.preApproval == null ){
            return false;
        }

        if ( student.preApproval.status != ApprovalStatus.COORDINATOR_PENDING ){
            return false;
        }

        if ( student.preApproval.totalCredit < 30 ){
            throw new Error("Total credit is less than 30");
        }
        
        for ( const pendingCourse of student.preApproval.pendingCourses ){
            if ( pendingCourse.bilkentCourse.courseType == CourseType.MANDATORY ){
                throw new Error("There are still pending mandatory courses");
            }
        }

        student.preApproval.status = ApprovalStatus.COORDINATOR_REJECTED;
        student.preApproval.status = ApprovalStatus.ADMINISTRATION_PENDING;
        await PreApprovalRepo.preApprovalRepo.save(student.preApproval);
        return true;
    }

    




}