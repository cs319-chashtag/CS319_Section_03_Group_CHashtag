import { AppDataSource } from '../data-source';
import { ApprovalStatus, PreApproval } from '../entity/ApprovalsEntity/PreApproval';
import { ApprovedCourse } from '../entity/CoursesEntity/ApprovedCourse';
import { ApprovedHostCourse } from '../entity/CoursesEntity/ApprovedHostCourse';
import { BilkentCourse, CourseType } from '../entity/CoursesEntity/BilkentCourse';
import { HostCourse } from '../entity/CoursesEntity/HostCourse';
import { StudentCourse } from '../entity/CoursesEntity/StudentCourse';
import { Administration } from '../entity/UsersEntity/Administration';
import { Coordinator } from '../entity/UsersEntity/Coordinator';
import { ExchangeType, SemesterType, Student } from '../entity/UsersEntity/Student';
import { DepartmentType, User, UserType } from '../entity/UsersEntity/User';
import AdministrationRepo from './AdministrationRepo';
import CoordinatorRepo from './CoordinatorRepo';
import SchoolRepo from './SchoolRepo';

export default class StudentRepo {
    // private static instance: StudentRepo;
    private constructor() { }

    //DONE
    public static async findStudentById(id : number): Promise<Student | null> {
        const studentRepository = AppDataSource.getRepository(Student)
        return studentRepository.findOne({
            where: {
                id: id
            },
            relations: {
                preApproval: {
                    approvedCourses : {
                        bilkentCourse: true,
                        approvedHostCourses: true
                    }
                }
            }
        })
    }

    //DONE
    public static async setPreApprovalStatus(id : number, status: ApprovalStatus): Promise<boolean> {
        const studentRepo = AppDataSource.getRepository(Student)
        const student =  await StudentRepo.findStudentById(id);
        if (student == null) {
            return false;
        }
        student.preApproval.status = status;
        await studentRepo.save(student);
        return true;
    }

    //DONE
    public static async removeStudentById(id : number ): Promise<boolean> {
        const student =  await StudentRepo.findStudentById(id);

        if (student == null) {
            return false;
        }
        const studentRepo = AppDataSource.getRepository(Student)
        if ( student.preApproval != null) {
            const preApprovalRepo = AppDataSource.getRepository(PreApproval)
            const approvedCourseRepo = AppDataSource.getRepository(ApprovedCourse)
            const approvedHostCourseRepo = AppDataSource.getRepository(ApprovedHostCourse)
            const coordinatorRepo = AppDataSource.getRepository(Coordinator)
            const bilkentCourseRepo = AppDataSource.getRepository(BilkentCourse)
            const administrationRepo = AppDataSource.getRepository(Administration)
            
            for (const approvedCourse of student.preApproval.approvedCourses) {
                if (approvedCourse.approvedHostCourses != null) {
                    for (const approvedHostCourse of approvedCourse.approvedHostCourses) {
                        await approvedHostCourseRepo.remove(approvedHostCourse);
                    }
                }
                if (approvedCourse.bilkentCourse != null) {
                    await bilkentCourseRepo.remove(approvedCourse.bilkentCourse);
                }
                await approvedCourseRepo.remove(approvedCourse);
            }
            
            if( student.coordinator != null){
                student.coordinator.students = student.coordinator.students.filter((s) => s.id != student.id);
                await coordinatorRepo.save(student.coordinator);
            }
            if ( student.administration != null) {
                student.administration.students = student.administration.students.filter((s) => s.id != student.id);
                await administrationRepo.save(student.administration);
            }
            await preApprovalRepo.remove(student.preApproval);
        }
        await studentRepo.remove(student);
        return true;
    }

    //DONE
    public static async findStudentByDepartment(department : DepartmentType): Promise<Student[] | null> {
        const studentRepository = AppDataSource.getRepository(Student)
        const studentArray = await studentRepository.find({
            where: {
                department: department
            },
            relations: {
                preApproval : true
                // preApproval: {
                //     approvedCourses : {
                //         bilkentCourse: true,
                //         approvedHostCourses: true
                //     }
                // }
            }
        })
        // console.log("Student: ",studentArray);
        // if (studentArray == null || studentArray.length == 0) {
        //     throw new Error("There is no student in this department or department is not valid");
        // }

        return studentArray;
    }

    //DONE
    public static async findByEmail(email : string): Promise<Student | null> {
        const studentRepository = AppDataSource.getRepository(Student)
        return studentRepository.findOne({
            where: {
                email: email
            },
            relations: {
                preApproval: {
                    approvedCourses : {
                        bilkentCourse: true,
                        approvedHostCourses: true
                    }
                }
            }
        })
    }

    //DONE
    public static async create(id : number, email: string, firstName: string, lastName: string, password: string, department: DepartmentType, exhangeType: ExchangeType, semesterType : SemesterType, schoolName : string) : Promise<boolean | null> {
        var created = false;
        await StudentRepo.findStudentById(id).then(async (student) => {
            if (student != null) {
                throw new Error("Student already exists");
            }
            else {
                // console.log("newStudent: ", newStudent);
                const studentRepository = AppDataSource.getRepository(Student);
                // student = newStudent;
                const student = new Student();
                student.id = id;
                student.email = email;
                student.firstName = firstName;
                student.lastName = lastName;
                student.password = password;
                student.department = department;
                student.exhangeType = exhangeType;
                student.school = await SchoolRepo.getSchoolByNameAndDepartment(schoolName, department);
                student.semesterType = semesterType;

                const coordinatorArray = await CoordinatorRepo.findCoordinatorByDepartment(department);
                const lengthCoordinatorArray = coordinatorArray.length;
                var minIndex = 0;
                for ( const coor of coordinatorArray) {
                    if (coor.students.length < coordinatorArray[minIndex].students.length) {
                        minIndex = coordinatorArray.indexOf(coor);
                    }
                }
                coordinatorArray[minIndex].students.push(student);
                student.coordinator = coordinatorArray[minIndex];

                const administrationArray = await AdministrationRepo.findAdministrationByDepartment(department);
                for ( const administration of administrationArray) {
                    administration.students.push(student);
                    student.administration = administration;
                }
                
                student.preApproval = null;
                student.learningAgreement = null;
                student.fct = null;
                student.userType = UserType.STUDENT;
                
                await studentRepository.save(student).then((student) => {
                    console.log("Student has been saved to the database with id: " + student.id);
                    // return student;
                }).catch(() => {
                    throw Error("Student could not be saved to the database with id: " + id);
                });
                created = true;
            }
        }).catch((err) => {
            throw err;
        });
        return created;
    }
    
    public static async createPreApproval(id : number ): Promise<Student | null> {
        return StudentRepo.findStudentById(id).then(async (student) => {
            if (student == null)
                throw new Error("Student not found in the database. Please check the student id.");
    
            if (student.preApproval != null){
                throw new Error("Student already has a pre-approval.");
            }
            else{
                const preApproval = new PreApproval();
                preApproval.studentId = student.id;
                preApproval.totalCredit = 0;
                preApproval.status = ApprovalStatus.STUDENT_PENDING;
                preApproval.approvedCourses = [];
                preApproval.pendingCourses = [];
                preApproval.administrationResponse = "";
                preApproval.coordinatorResponse = "";
                
                student.preApproval = preApproval;

                await StudentRepo.updateStudent(student).then((student) => {
                    console.log("Student has been saved to the database.");
                    console.log("Student id: " + student.id);
                    return student;
                }).catch((error) => {
                    throw Error("Student could not be saved to the database.");
                });
                return student;
            }
        }).catch((error) => {
            throw error;
        });
        // return null;
    }

    public static async updatePreApproval(id : number, preApproval: PreApproval): Promise<Student | null> {

        return StudentRepo.findStudentById(id).then(async (student) => {
            if (student == null)
                throw new Error("Student not found in the database. Please check the student id.");

            student.preApproval = preApproval;
            
            await StudentRepo.updateStudent(student).then((student) => {
                console.log("Student has been saved to the database.");
                console.log("Student id: " + student.id);
                return student;
            }
            ).catch((error) => {
                throw Error("Student could not be saved to the database.");
            });
            return student;
        }).catch((error) => {
            throw error;
        });
    }

    public static async updatePreApproval2(id : number, preApproval: PreApproval ): Promise<Student | null> {

        return StudentRepo.findStudentById(id).then(async (student) => {
            if (student == null)
                throw new Error("Student not found in the database. Please check the student id.");

            // if (student.preApproval != null){
            //     throw new Error("Student already has a pre-approval.");
            // }
            var credit = 0;
            

            // preApproval.approvedCourses.forEach(async (approvedCourse : ApprovedCourseItem) => {
            //     console.log("Approved Course: " , approvedCourse);
            // });
            
            const apprvdCoursesArray = [];
            var bool = false;
            for (const approvedCourse of preApproval.approvedCourses){
                    bool = true;
                    var dataBilkent = false;
                    var dataHost = false;
                    
                // preApproval.approvedCourses.forEach(async (approvedCourse : ApprovedCourseItem) => {
                    if ( approvedCourse ){
                        console.log("Approved Course: " , approvedCourse);
                    await StudentRepo.findStudentBilkentCoursesByComparingBilkentCourse(student.id, approvedCourse.bilkentCourse).then(async (foundCourse) => {
                        console.log("FOUND COURSE : " , foundCourse);
                        if (foundCourse != null){
                            await StudentRepo.checkApprovalCourseByHostCourses( foundCourse.bilkentCourse.courseType, foundCourse.approvedHostCourses  , approvedCourse.bilkentCourse.courseType, approvedCourse.approvedHostCourses ).then(async (result) => {
                                console.log("RESULT INSIDE : " , result);
                                dataHost = result;
                            }).catch((error) => {
                                throw error;
                            });
                        }
                    }).catch((error) => {
                        throw error;
                    });
                    }
                    console.log("DATA : " , dataHost);
                    if (dataHost)
                        continue;
                    if ( dataBilkent ){
                        console.log("DATA BILKENT : " , dataBilkent);
                        // continue;
                    }
                    const bilkentCoursesRepository = AppDataSource.getRepository(BilkentCourse);
                    const bilkentCourse = new BilkentCourse();
                    bilkentCourse.code = approvedCourse.bilkentCourse.code;
                    bilkentCourse.name = approvedCourse.bilkentCourse.name;
                    bilkentCourse.credit = approvedCourse.bilkentCourse.credit;
                    bilkentCourse.courseType = approvedCourse.bilkentCourse.courseType;
                    console.log("SAVING BILKENT COURSE");
                    await bilkentCoursesRepository.save(bilkentCourse).then(async (bilkentCourse) => {
                            console.log("Bilkent Course has been saved to the database.");
                            
                            const approvedHostCoursesRepository = AppDataSource.getRepository(ApprovedHostCourse);
                            
                            const approvedHostCoursesArray = [];

                        for (const approvedHostCourse of approvedCourse.approvedHostCourses){
                            // credit += approvedCourse.bilkentCourse.credit;
                            const apprvdHstCourses = new ApprovedHostCourse();
                            apprvdHstCourses.code = approvedHostCourse.code;
                            apprvdHstCourses.name = approvedHostCourse.name;
                            apprvdHstCourses.credit = approvedHostCourse.credit;
                            apprvdHstCourses.school = student.school.name;
                            // approvedHostCourses.hostSchool = approvedCourse.hostSchool;
                            console.log("APPROVED HOST COURSES WILL BE ADDED : " , apprvdHstCourses.code);
                            
                            await approvedHostCoursesRepository.save(apprvdHstCourses).then((hcourses) => {
                                credit += hcourses.credit;
                                // console.log("DIFFERENCE approvedHostCourses: ", hcourses);
                                approvedHostCoursesArray.push(hcourses);
                                // console.log("COURSE approveCourses : " , hcourses);
                                console.log("Approved Host Course has been saved to the database." + hcourses.code);
                            }
                            ).catch(() => {
                                throw Error("Approved Host Course could not be saved to the database : " + apprvdHstCourses.code);
                            });
                            // console.log("------WHYYY ");
                            
                        }
        
                            console.log("TEST: " , approvedHostCoursesArray);
                            
                            const approvedCoursesRepository = AppDataSource.getRepository(ApprovedCourse);
                            const approvedCourses = new ApprovedCourse();
                            approvedCourses.school = null;
                            approvedCourses.bilkentCourse = bilkentCourse;
                            approvedCourses.approvedHostCourses = approvedHostCoursesArray;
        
                            await approvedCoursesRepository.save(approvedCourses).then(async (approvedCourses) => {
                                console.log("-----------Approved Course has benn pushed to apprvdCoursesArray" , approvedCourses.bilkentCourse.code);
                                apprvdCoursesArray.push(approvedCourses);
                            }).catch((error) => {
                                throw error;
                            });
                    }).catch((error) => {
                        throw error;
                    });
        
                    console.log("BILKENT COURSE SAVED ?");
        
                    console.log("-------------------FINISHEDLOOP----------------------------------");
                    // })
            }

            console.log("APPROVED COURSES ARRAY: " , apprvdCoursesArray);
            const preApprovalRepository = AppDataSource.getRepository(PreApproval);
            const updatedPreApproval = new PreApproval();
            updatedPreApproval.studentId = student.id;
            updatedPreApproval.totalCredit = credit;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            // updatedPreApproval.status = preApproval.status; TODO
            updatedPreApproval.approvedCourses = apprvdCoursesArray;
            await preApprovalRepository.save(updatedPreApproval).then(async (approval) => {
                
                console.log("Pre-Approval has been saved to the database.");
                console.log("Pre-Approval id: " + approval.studentId);
                student.preApproval = updatedPreApproval;
                const studentRepository = AppDataSource.getRepository(Student);
                await studentRepository.save(student).then((student) => {
                    console.log("Student has been saved to the database.");
                    console.log("Student id: " + student.id);
                    return student;
                }).catch(() => {
                    throw Error("Student could not be saved to the database.");
                });
                console.log("Approved Course has been saved to the database.");
            }
            ).catch((error) => {
                throw error;
                // throw Error("Approved Course could not be saved to the database.");
            }
            );
            // student.preApproval = preApproval;
            // preApproval.approvedCourses.forEach(async (approvedCourse : ApprovedCourseItem) => {

            // const bilkentCoursesRepository = AppDataSource.getRepository(BilkentCourse);
            // const bilkentCourse = new BilkentCourse();
            // bilkentCourse.code = approvedCourse.bilkentCourse.code;
            // bilkentCourse.name = approvedCourse.bilkentCourse.name;
            // bilkentCourse.credit = approvedCourse.bilkentCourse.credit;
            // credit += approvedCourse.bilkentCourse.credit;
            // bilkentCourse.courseType = approvedCourse.bilkentCourse.courseType;
            // console.log("SAVING BILKENT COURSE");
            // await bilkentCoursesRepository.save(bilkentCourse).then(async (bilkentCourse) => {
            //         console.log("Bilkent Course has been saved to the database.");
                    
            //         const approvedHostCoursesRepository = AppDataSource.getRepository(ApprovedHostCourse);
            //         const approvedHostCourses = new ApprovedHostCourse();
            //         const approvedHostCoursesArray = [];
            //     //     try {
            //     //     });
            //     // } catch (error) {
            //     //     throw error;
            //     // }
            
            //     approvedCourse.approvedHostCourses.forEach(async (approvedHostCourse : ApprovedHostCourseItem) => {
            //         approvedHostCourses.code = approvedHostCourse.code;
            //         approvedHostCourses.name = approvedHostCourse.name;
            //         approvedHostCourses.credit = approvedHostCourse.credit;
            //         approvedHostCourses.school = student.school;
            //         // approvedHostCourses.hostSchool = approvedCourse.hostSchool;
            //         console.log("APPROVED HOSt COURSES WILL BE ADDED : " , approvedHostCourses.code);
            //         approvedHostCoursesArray.push(approvedHostCourses);
            //         await approvedHostCoursesRepository.save(approvedHostCourses).then((approvedHostCourses) => {
            //             console.log("Approved Host Course has been saved to the database." + approvedHostCourses.code);
            //         }
            //         ).catch(() => {
            //             throw Error("Approved Host Course could not be saved to the database : " + approvedHostCourses.code);
            //         });
            //         console.log("------WHYYY ");
                    
            //     })

            //     console.log("TEST: " , approvedCourse.approvedHostCourses);
                    
            //         const approvedCoursesRepository = AppDataSource.getRepository(ApprovedCourse);
            //         const approvedCourses = new ApprovedCourse();
            //         approvedCourses.school = null;
            //         approvedCourses.bilkentCourse = bilkentCourse;
            //         approvedCourses.approvedHostCourses = approvedHostCoursesArray;
            //         console.log("PROBLEM : " + approvedCourses.approvedHostCourses.length);

            //         await approvedCoursesRepository.save(approvedCourses).then(async (approvedCourses) => {
            //             const preApprovalRepository = AppDataSource.getRepository(PreApproval);
            //         const preApproval = new PreApproval();
            //         preApproval.studentId = student.id;
            //         preApproval.totalCredit = credit;
            //         preApproval.status = preApproval.status;
            //         preApproval.approvedCourses = [approvedCourses];
            //         await preApprovalRepository.save(preApproval).then(async (preApproval) => {
            //             console.log("Pre-Approval has been saved to the database.");
            //             console.log("Pre-Approval id: " + preApproval.studentId);
            //             student.preApproval = preApproval;
            //             const studentRepository = AppDataSource.getRepository(Student);
            //             await studentRepository.save(student).then((student) => {
            //                 console.log("Student has been saved to the database.");
            //                 console.log("Student id: " + student.id);
            //                 return student;
            //             }).catch((error) => {
            //                 throw Error("Student could not be saved to the database.");
            //             });
            //             console.log("Approved Course has been saved to the database.");
            //         }
            //         ).catch(() => {
            //             throw Error("Approved Course could not be saved to the database.");
            //         }
            //         );
                    
            //         // await StudentRepo.findCoordinatorById(22452296).then((coordinator) => { //////////// TODO: Change this to the coordinator id of the student
            //         //     preApproval.coordinator = coordinator;
            //         // }).catch(() => {
            //         //     throw Error("Coordinator could not be found in the database.");
            //         // });
            //         // preApproval.coordinatorId = preApproval.coordinatorId;
                    
            //             // updateStudent(student).then((student) => {
            //             //     console.log("Student has been saved to the database.");
            //             //     console.log("Student id: " + student.id);
            //             // }).catch((error) => {
            //             //     console.log(error);
            //             // });

            //         }).catch((error) => {
            //             throw error;
            //         });
            // }).catch((error) => {
            //     throw error;
            // });

            // console.log("BILKENT COURSE SAVED ?");

            // console.log("-------------------FINISHEDLOOP----------------------------------");
            // })

            console.log("-------------------FINISHED----------------------------------");
            return student;
        //.catch((error) => {
        //     throw error;
        // });


        // return preApproval;
        //     });

    
                            
            //                 }).catch((error) => {
            //                     console.log(error);
            //                 });
            //             }).catch((error) => {
            //                 console.log("Cannot save Approved Host Course to the database!");
            //                 console.log(error);
            //             });
                
            //         }).catch((error) => {
            //             console.log("Cannot save Approved Host Course to the database!");
            //             console.log(error);
            //         });
                                
                                    
            //     }).catch((error) => {
            //         console.log("Cannot save Bilkent Course to the database!");
            //         console.log(error);
            //     });
            // }
            
            // return student;
    
        });
        
        // return StudentRepo.findStudentById(id).then(async (student) => {
        //     return student;
        // }).catch((error) => {
        //     throw error;
        // });
        // return null;
    }


    //THIS IS NOT REQUIRED
    public static async getPreApproval(id : number ): Promise<PreApproval | null> {
        return StudentRepo.findStudentById(id).then(async (student) => {
            return student.preApproval;
        }).catch((error) => {
            throw error;
        });
    }


    public static async findStudentBilkentMustCourses(id: number): Promise<ApprovedCourse[]> {
        // Promise<Student | null>

        const student = await StudentRepo.findStudentById(id).then(async (student) => {
            return student;
        }).catch((error) => {
            throw error;
        });

        var approvedCoursesArray = []
        for(const approvedCourse of student.preApproval.approvedCourses){
            console.log("APPROVED COURSE: " , approvedCourse);
            if ( approvedCourse.bilkentCourse.courseType == CourseType.MANDATORY )
                approvedCoursesArray.push(approvedCourse);
        
        }
        return approvedCoursesArray;
        // throw Error("Bilkent Course Code "+ bilkentCourse.code + " could not be found in the database.");
        // console.log("STUDENT: " , student);

        // return StudentRepo.findStudentById(id).then(async (student) => {
        //     return student;
        // }).catch((error) => {
        //     throw error;
        // });

    }

    public static async findStudentBilkentMustCourseByCourseCode(id: number, courseCode : string): Promise<ApprovedCourse> {
        // Promise<Student | null>

        const student = await StudentRepo.findStudentById(id).then(async (student) => {
            return student;
        }).catch((error) => {
            throw error;
        });

        var mustCourse = null; 
        for(const approvedCourse of student.preApproval.approvedCourses){
            console.log("APPROVED COURSE: " , approvedCourse);
            if ( approvedCourse.bilkentCourse.courseType == CourseType.MANDATORY &&  approvedCourse.bilkentCourse.code == courseCode)
            mustCourse = approvedCourse;
        
        }
        if ( mustCourse == null)
            return null;
        return mustCourse;
        // throw Error("Bilkent Course Code "+ bilkentCourse.code + " could not be found in the database.");
        // console.log("STUDENT: " , student);

        // return StudentRepo.findStudentById(id).then(async (student) => {
        //     return student;
        // }).catch((error) => {
        //     throw error;
        // });

    }

    public static async findAllStudentBilkentMustCourseByCourseCode(courseCode : string): Promise<number[]> {
        // Promise<Student | null>
        const students = await StudentRepo.findAllStudents();

        // var mustCourse = null; 
        var studentIdArray = [];
        for(const student of students){
            if ( student.preApproval != null){
                for(const approvedCourse of student.preApproval.approvedCourses){
                    console.log("APPROVED COURSE: " , approvedCourse);
                    if ( approvedCourse.bilkentCourse.courseType == CourseType.MANDATORY &&  approvedCourse.bilkentCourse.code == courseCode){
                        studentIdArray.push(student.id);
                        // mustCourse = approvedCourse;
                    }
                }
            }
        }
        return studentIdArray;
        // return mustCourse;
        // throw Error("Bilkent Course Code "+ bilkentCourse.code + " could not be found in the database.");
        // console.log("STUDENT: " , student);

        // return StudentRepo.findStudentById(id).then(async (student) => {
        //     return student;
        // }).catch((error) => {
        //     throw error;
        // });

    }

    public static async findAllStudents(): Promise<Student[]| null> {
        // Promise<Student | null>
        const studentRepository = AppDataSource.getRepository(Student)
        const students = await studentRepository.find().then(async (students) => {
            return students;
        }).catch((error) => {
            throw error;
        });

        return students;
        // throw Error("Bilkent Course Code "+ bilkentCourse.code + " could not be found in the database.");
        // console.log("STUDENT: " , student);

        // return StudentRepo.findStudentById(id).then(async (student) => {
        //     return student;
        // }).catch((error) => {
        //     throw error;
        // });


    }

    public static async findAllStudentsAssignedtoCoordinator(coordinatorId: number, department: DepartmentType): Promise<Student[]| null> {
        // Promise<Student | null>

        const students = await StudentRepo.findStudentByDepartment(department);

        const studentsAssignedToCoordinator = [];
        for (const student of students){
            if ( student.preApproval != null && student.coordinator.id == coordinatorId)
                studentsAssignedToCoordinator.push(student);
        }

        if ( studentsAssignedToCoordinator.length == 0)
            return null;

        return studentsAssignedToCoordinator;
    }

    public static async findStudentBilkentCoursesByComparingBilkentCourse(id: number, bilkentCourse: BilkentCourse): Promise<ApprovedCourse | null> {
        // Promise<Student | null>

        const student = await StudentRepo.findStudentById(id).then(async (student) => {
            return student;
        }).catch((error) => {
            throw error;
        });

        console.log()
////////////////////////////////////////////////////////////////////////////////////////////////TODOOOOOOOO////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        for(const approvedCourse of student.preApproval.approvedCourses){
            console.log("APPROVED COURSE: " , approvedCourse);
            if(approvedCourse.bilkentCourse.code == bilkentCourse.code && approvedCourse.bilkentCourse.name == bilkentCourse.name && approvedCourse.bilkentCourse.credit == bilkentCourse.credit ){ ////// && approvedCourse.bilkentCourse.courseType == bilkentCourse.courseType
                return approvedCourse;
            }
        }
        return null;
        // throw Error("Bilkent Course Code "+ bilkentCourse.code + " could not be found in the database.");
        // console.log("STUDENT: " , student);

        // return StudentRepo.findStudentById(id).then(async (student) => {
        //     return student;
        // }).catch((error) => {
        //     throw error;
        // });

    }

    public static async checkApprovalCourseByHostCourses(oldCourseType : CourseType, oldApprovedHostCourses: HostCourse[], newCourseType : CourseType, newApprovedHostCourses: ApprovedHostCourseItem[]): Promise<boolean> {
        // Promise<Student | null>
        try{
        for (const oldApprovedHostCourse of oldApprovedHostCourses) {
            // console.log("OLD APPROVED HOST COURSE: " , oldApprovedHostCourse);
            var isFound = false;
            // console.log("OldCourseType: " , oldCourseType);
            // console.log("NewCourseType: " , newCourseType);
            for (const newApprovedHostCourse of newApprovedHostCourses) {
                if (oldApprovedHostCourse.code == newApprovedHostCourse.code) {
                    if ( oldCourseType != newCourseType ){
                        throw Error("Course Type cannot be different for the same course code.");
                    }
                    if (oldApprovedHostCourse.name != newApprovedHostCourse.name && oldCourseType == CourseType.MANDATORY  ){
                        throw Error("Course name cannot be different for the same course code for Bilkent mandatory courses.");
                    }
                    console.log("oldApprovedHostCourse: ",oldApprovedHostCourse);
                    console.log("newApprovedHostCourse: ",newApprovedHostCourse);
                    if (oldApprovedHostCourse.credit != newApprovedHostCourse.credit ){
                        throw Error("Credits cannot be different for the same course code.");
                    }
                    isFound = true;
                    break;
                }
            }
            if ( !isFound ) {
                return false;
            }
        }
        }catch(error){
            throw error;
        }
        return true;
        // console.log("STUDENT: " , student);

        // return StudentRepo.findStudentById(id).then(async (student) => {
        //     return student;
        // }).catch((error) => {
        //     throw error;
        // });

    }

    //DONE
    public static async updateStudent(student : Student): Promise<Student | null> {
        StudentRepo.findStudentById(student.id).then(async (student) => {
            const studentRepository = AppDataSource.getRepository(Student)
            if (student == null)
                throw new Error("Student not found in the database. Please check the student id.");
            else if (student.id == null) {
                throw new Error("Student id not found");
            }
            else if (student.email == null) {
                throw new Error("Student email not found");
            }
            else if (student.firstName == null) {
                throw new Error("Student first name not found");
            }
            else if (student.lastName == null) {
                throw new Error("Student last name not found");
            }
            else if (student.password == null) {
                throw new Error("Student password not found");
            }
            else if (student.department == null) {
                throw new Error("Student department not found");
            }
            else if (student.exhangeType == null) {
                throw new Error("Student exhange type not found");
            }
            else if (student.school == null) {
                throw new Error("Student school not found");
            }

            return studentRepository.save(student);
        }).catch((error) => {
            throw error;
        });
    return null;
    }
}

export interface PreApprovalItem {
    studentId: number,
    totalCredit: number,
    status: string,
    approvedCourses: ApprovedCourseItem[],
    coordinator : Coordinator 
}

interface ApprovedCourseItem {
    bilkentCourse: BilkentCourseItem,
    approvedHostCourses: ApprovedHostCourseItem[]
}
interface BilkentCourseItem {
    code: string,
    name: string,
    credit: number,
    courseType: CourseType
}
interface ApprovedHostCourseItem {
    code: string,
    name: string,
    credit: number
}


// const studentCourseData = {
//     studentId : 21902296,
//     totalCredit : 0,
//     status : "Coordinator Pending",
//     approvedCourses : [
//     {
//         approvedHostCourses : [
//             {
//                 code : "X_400614",
//                 name : "Data Structures and Algorithms",
//                 credit : 6,
//             },
//             {
//                 code : "X_400614",
//                 name : "Data Structures and Algorithms",
//                 credit : 6,
//             },
//             {
//                 code : "X_400614",
//                 name : "Data Structures and Algorithms",
//                 credit : 6,
//             },
//             {
//                 code : "X_400614",
//                 name : "Data Structures and Algorithms",
//                 credit : 6,
//             },
//         ],
//         bilkentCourse : {
//             code : "CS473",
//             name : "Algorithms I",
//             credit : 3,
//             courseType : "Mandatory",
//         }
//     },
//     {
//         approvedHostCourses : [
//             {
//                 code : "L_GCBAALG003",
//                 name : "Imagining the Dutch: themes in Dutch History",
//                 credit : 6,
//             },
//             {
//                 code : "X_400614",
//                 name : "Data Structures and Algorithms",
//                 credit : 6,
//             },
//             {
//                 code : "X_400614",
//                 name : "Data Structures and Algorithms",
//                 credit : 6,
//             },
//         ],
//         bilkentCourse : {
//             code : "Arts Core Elective",
//             name : "",
//             credit : 3,
//             courseType : "Arts Core Elective",
//         }
//     },
//     {
//         approvedHostCourses : [
//             {
//                 code : "X_400614",
//                 name : "Data Structures and Algorithms",
//                 credit : 3,
//             },
//         ],
//         bilkentCourse : {
//             code : "CS473",
//             name : "Algorithms I",
//             credit : 3,
//             courseType : "Mandatory",
//         }
//     },
//     {
//         approvedHostCourses : [
//             {
//                 code : "L_AABAALG056",
//                 name : "Amsterdam: A Historical Introduction",
//                 credit : 5,
//             },
//         ],
//         bilkentCourse : {
//             code : "General Elective",
//             name : "",
//             credit : 3,
//             courseType : "General Elective",
//         }
//     },
//     {
//         approvedHostCourses : [
//             {
//                 code : "X_4006134",
//                 name : "Data and Algorithms",
//                 credit : 2,
//             },
//             {
//                 code : "X_401020",
//                 name : "Statistical Methods",
//                 credit : 1,
//             },
//             {
//                 code : "X_401020",
//                 name : "Statistical Methods",
//                 credit : 2,
//             },
//         ],
//         bilkentCourse : {
//             code : "Technical Elective",
//             name : "MATH 260",
//             credit : 3,
//             courseType : "Technical Elective",
//         }
//     },
//     {
//         approvedHostCourses : [
//             {
//                 code : "X_400614",
//                 name : "Data Structures and Algorithms",
//                 credit : 6,
//             },
//         ],
//         bilkentCourse : {
//             code : "CS473",
//             name : "Algorithms I",
//             credit : 3,
//             courseType: "Mandatory",
//         }
//     },
//     ],
//     // coordinator : {
//     //     id : 1,
//     //     email : "", 
//     // }
// };