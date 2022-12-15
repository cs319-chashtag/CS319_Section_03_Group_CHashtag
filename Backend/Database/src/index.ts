import { AppDataSource } from "./data-source"
import { Student, ExchangeType } from "./entity/UsersEntity/Student"
import { Coordinator } from "./entity/UsersEntity/Coordinator"
import { School } from "./entity/SchoolEntity/School"
import { ApprovedCourse } from "./entity/CoursesEntity/ApprovedCourse"
import { ApprovedHostCourse } from "./entity/CoursesEntity/ApprovedHostCourse"
import { BilkentCourse, CourseType } from "./entity/CoursesEntity/BilkentCourse"
import { PreApproval } from "./entity/ApprovalsEntity/PreApproval"
// import { Administration } from "./entity/UsersEntity/Administration"
import  StudentRepo , {PreApprovalItem}  from "./repository/StudentRepo"
import schoolRepo from "./repository/SchoolRepo"
import CoordinatorRepo from "./repository/CoordinatorRepo"

var compare1 = {
        approvedHostCourses : [
            {
                code : "X_400614",
                name : "Data Structures and Algorithms",
                credit : 6,
            },
            {
                code : "L_GCBAALG003",
                name : "Imagining the Dutch: themes in Dutch History",
                credit : 6,
            },
        ],
        bilkentCourse : {
            code : "CS473",
            name : "Algorithms I",
            credit : 3,
            courseType : "Mandatory",
        }
}

var compare2 = {
    approvedHostCourses : [
        {
            code : "X_400614",
            name : "Data Structures and Algorithms",
            credit : 6,
        },
        {
            code : "L_GCBAALG003",
            name : "Imagining the Dutch: themes in Dutch History",
            credit : 6,
        },
    ],
    bilkentCourse : {
        code : "CS473",
        name : "Algorithms I",
        credit : 3,
        courseType : "Mandatory",
    }
}

var studentCourseData  =  {
    studentId : 21902296,
    totalCredit : 0,
    status : "Coordinator Pending",
    approvedCourses : [
    {
        approvedHostCourses : [
            
            {
                code : "X_400614",
                name : "Data Structures and Algorithms",
                credit : 6,
                school : "University of Amsterdam",
            },
            {
                code : "L_GCBAALG003",
                name : "Imagining the Dutch: themes in Dutch History",
                credit : 6,
                school : "University of Amsterdam",
            },
        ],
        bilkentCourse : {
            code : "CS473",
            name : "Algorithms I",
            credit : 3,
            courseType : CourseType.ELECTIVE,
        }
    },
    // {
    //     approvedHostCourses : [
    //         {
    //             code : "testCourse",
    //             name : "Imagining the Dutch: themes in Dutch History",
    //             credit : 1,
    //         },
    //         {
    //             code : "testCourse2",
    //             name : "aefages",
    //             credit : 2,
    //         },
    //         {
    //             code : "testCourse3",
    //             name : "Algorithms",
    //             credit : 6,
    //         },
    //     ],
    //     bilkentCourse : {
    //         code : "Arts Core Elective",
    //         name : "",
    //         credit : 3,
    //         courseType : "Arts Core Elective",
    //     }
    // },
    // {
    //     approvedHostCourses : [
    //         {
    //             code : "OneCourse",
    //             name : "Data Structures and Algorithms",
    //             credit : 3,
    //         },
    //     ],
    //     bilkentCourse : {
    //         code : "General Elective",
    //         name : "Who knows",
    //         credit : 3,
    //         courseType : "General Elective",
    //     }
    // },
    // {
    //     approvedHostCourses : [
    //         {
    //             code : "L_AABAALG056",
    //             name : "Amsterdam: A Historical Introduction",
    //             credit : 5,
    //         },
    //     ],
    //     bilkentCourse : {
    //         code : "General Elective",
    //         name : "",
    //         credit : 3,
    //         courseType : "General Elective",
    //     }
    // },
    // {
    //     approvedHostCourses : [
    //         {
    //             code : "X_4006134",
    //             name : "Data and Algorithms",
    //             credit : 2,
    //         },
    //         {
    //             code : "X_401020",
    //             name : "Statistical Methods",
    //             credit : 1,
    //         },
    //         {
    //             code : "X_401020",
    //             name : "Statistical Methods",
    //             credit : 2,
    //         },
    //     ],
    //     bilkentCourse : {
    //         code : "Technical Elective",
    //         name : "MATH 260",
    //         credit : 3,
    //         courseType : "Technical Elective",
    //     }
    // },
    // {
    //     approvedHostCourses : [
    //         {
    //             code : "X_400614",
    //             name : "Data Structures and Algorithms",
    //             credit : 6,
    //         },
    //     ],
    //     bilkentCourse : {
    //         code : "CS473",
    //         name : "Algorithms I",
    //         credit : 3,
    //         courseType: "Mandatory",
    //     }
    // },
    ],
    coordinator : null
};

AppDataSource.initialize().then(async () => {
    // createOject();
    // getStudent(1234556).then((student) => {
    //     console.log(student);
    // }).catch((err) => {
    //     console.log("WHY");
    //     console.error(err);
    // });
    // getStudent(123456).then((student) => {
    //     if (student == null)
    //         throw new Error("Student not found in the database. Please check the student id.");
        
    //     console.log(student);
    // }).catch((err) => {
    //     console.error(err);
    // });

    // const id = 2102296;
    // const email = "test2@ug.bilkent.edu.tr";
    // const password = "123456";
    // const name = "Test2";
    // const surname = "Test2";
    // const school = "Uppsala University";
    // const department = "EE";
    
    // await StudentRepo.findCoordinatorById(22452296).then((coordinator) => {
    //     studentCourseData.coordinator = coordinator;
    //     // console.log(coordinator);
    // }).catch((err) => {
    //     throw new Error("Coordinator not found in the database. Please check the coordinator id.");
    // });

    // console.log("Coordinator : " , studentCourseData.coordinator);
    
    // await StudentRepo.updatePreApproval(123456,studentCourseData).then((student) => {
    //     console.log("STUDENT : ", student);
    // }).catch((err) => {
    //     console.error(err);
    // });

    //////////////////////////// TESTS ////////////////////////////
    // const approval = await StudentRepo.getPreApproval(123456);
    // console.log("Approval : ", approval);
    // console.log( await schoolRepo.getSchoolByName("ETH") );
    // console.log("ARRAY STUDENT : " , await StudentRepo.findStudentByDepartment("EE"));
    // console.log("ARRAY COORDINATOR : " , await CoordinatorRepo.findCoordinatorByDepartment("CS"));


    // console.log(await StudentRepo.changePassword(22452296, "changed2"));
    // console.log( await StudentRepo.setPreApprovalStatus(21902296, "Admn Pending") );

    console.log( await StudentRepo.removeStudentById(123456) );
    

    //////////////////////////// TESTS ////////////////////////////

    // StudentRepo.findStudentBilkentCourses(21902296, "General Elective").then((courses) => {
    //     console.log(courses);
    // }).catch((err) => {
    //     console.error(err);
    // });

    // var data = false;

    // await StudentRepo.findStudentBilkentCourses(21902296,studentCourseData.approvedCourses[1].bilkentCourse ).then(async (courses) => {
    //     await StudentRepo.checkApprovalCourseByHostCourses(courses.bilkentCourse.courseType, courses.approvedHostCourses, studentCourseData.approvedCourses[0].bilkentCourse.courseType ,studentCourseData.approvedCourses[0].approvedHostCourses).then((result) => {
    //         console.log("RESULT : " , result);
    //         data = result;
    //     }).catch((err) => {
    //         throw err;
    //     });
    //     // console.log(courses);
    // }).catch((err) => {
    //     // throw "HERE: " + err;
    //     console.error( " HERE: ", err);
    // });
    // console.log("DATA : " , data);



    
    
    // await StudentRepo.findById(21902296).then((student) => {
    //     console.log("APPROVAL : " , student.preApproval);
    // }).catch((err) => {
    //     console.error(err);
    // });
    // console.log("------HERE:    " , func);
    
    // console.log("Creating a new Student...");

    // try {
    //     await createStudent(id, email, name, surname, password, department, "ERASMUS", school);
    // } catch (err) {
    //     console.error("ERROR HERE" , err.message);
    // }

    // await createStudent(id, email, name, surname, password, department, "ERASMUS", school).then((student) => {
    //     console.log("Student created successfully.");
    //     console.log(student);
    // }).catch((err) => {
    //     console.error("ERROR HERE" , err.message);
    // });

    

    // await createStudent(id, email, name, surname, password, department, "ERASMUS", school).catch((err) => {
    //     console.error("ERROR HERE" , err.message);
    // });

      
    // await createStudent(id, email, name, surname, password, department, "ERASMUS", school).catch((err) => {
    //     console.error("ERROR HERE" , err.message);
    // });


    
    // console.log("Student:", stdnt);
    

    // const preApproval = getPreApproval(21902296);
    // console.log("PreApproval: ", preApproval);

    // getPreApproval(21902296).then((preApproval) => {
    //     console.log(preApproval);
    // });
    // getPreApproval(123456)


    // console.log("Student " + student);
    
    // getStudentApproval(123456);
    // const std2 = await getStudent(123456);
    // console.log("Student id: " + std2);

    console.log("This is the end of the example.");

    // console.log("Saved a new Coordinator with id: " + coordinator.id)
    // console.log("Loading Coordinator from the database...")

    // const coordinators = await coordinatorRepository.find()
    // console.log("Loaded Coordinator: ", coordinators)
    // console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log("TypeORM connection error: ", error))

// function test (){
//     try {
//         console.log("test");
//         if ( true ) {
//             throw new Error("test");
//         }
//     }catch (err) {
//         console.log("test2");
//         console.error("Error2: ", err);
//     } 
// }

async function createOject(){
    const studentRepository = AppDataSource.getRepository(Student)
    console.log("Inserting a new user into the database...");


    const bilkentCoursesRepository = AppDataSource.getRepository(BilkentCourse);
    const bilkentCourse = new BilkentCourse();
    bilkentCourse.code = "CS 353"
    bilkentCourse.name = "Database Systems"
    bilkentCourse.credit = 3
    bilkentCourse.courseType = CourseType.MANDATORY;
    await bilkentCoursesRepository.save(bilkentCourse);
    
    const approvedHostCourseRepository = AppDataSource.getRepository(ApprovedHostCourse);
    const approvedHostCourse = new ApprovedHostCourse();
    approvedHostCourse.code = "CS-322"
    approvedHostCourse.name = "Introduction to Database Systems"
    approvedHostCourse.credit = 4
    approvedHostCourse.school = "ETH";
    await approvedHostCourseRepository.save(approvedHostCourse);

    
    const approvedCoursesRepository = AppDataSource.getRepository(ApprovedCourse); 
    const approvedCourse = new ApprovedCourse();
    approvedCourse.bilkentCourse = bilkentCourse;
    approvedCourse.approvedHostCourses = [approvedHostCourse];
    await approvedCoursesRepository.save(approvedCourse);


    ////////////////////////////////////////////////////////////////// PreApproval
    const firstId = 21902296;
    const preApprovalRepository = AppDataSource.getRepository(PreApproval);
    const preApproval = new PreApproval();
    preApproval.studentId = firstId;
    preApproval.totalCredit = 0;
    preApproval.approvedCourses = [approvedCourse];
    preApproval.status = "Student Pending";
    await preApprovalRepository.save(preApproval);
    ////////////////////////////////////////////////////////////////// PreApproval END

    ////////////////////////////////////////////////////////////////// Coordinator
    const coordinatorRepository = AppDataSource.getRepository(Coordinator)
    console.log("Inserting a new user into the database...");
    const coordinator = new Coordinator();
    coordinator.id = 22452296
    coordinator.email = "coordinator@bilkent.edu.tr"
    coordinator.firstName = "Can"
    coordinator.lastName = "Alkan"
    coordinator.password = "password"
    coordinator.department = "CS"
    coordinator.courses = "CS467"
    // coordinator.preApprovals = [preApproval];
    // coordinator.preApprovals = ;
    // coordinator.fctApprovals = "SOME FCT APPROVALS"

    await coordinatorRepository.save(coordinator)
    ////////////////////////////////////////////////////////////////// Coordinator END



    const schoolETH = new School();
    schoolETH.name = "ETH"
    schoolETH.country = "Switzerland"
    schoolETH.approvedCourses = [approvedCourse];
    // schoolETH.students = [student];

    const schoolRepository = AppDataSource.getRepository(School);
    await schoolRepository.save(schoolETH);
    console.log("Saved a new School with name: " + schoolETH.name)
    // await saveSchoolToDatabase(schoolETH);
    // console.log("Saved a new School with name: " + schoolETH.name)


    const schoolEPFL = new School();
    schoolEPFL.name = "EPFL"
    schoolEPFL.country = "Switzerland"
    schoolEPFL.approvedCourses = [];
    // schoolEPFL.students = [student2];
    await updateSchool(schoolEPFL);
    console.log("Saved a new School with name: " + schoolEPFL.name)

    ////////////////////////////////////////////////////////////////// SAVE STUDENT
    // const schoolETH = await getSchooByName("ETH");
    
    const student = new Student();
    student.id = firstId;
    student.email = "test@bilkent.edu.tr"
    student.firstName = "Emre"
    student.lastName = "Tas"
    student.password = "password"
    student.department = "CS"
    student.exhangeType = ExchangeType.ERASMUS;
    student.school = schoolETH.name;
    student.preApproval = preApproval;
    // student.preApproval = null;
    // student.learningAgreement = null;

    await updateStudent(student);
    console.log("Saved a new Student with id: " + student.id)
    ////////////////////////////////////////////////////////////////// SAVE STUDENT END

    ////////////////////////////////////////////////////////////////// SAVE STUDENT 2
    // const schoolEPFL = await getSchooByName("EPFL");
    const student2 = new Student();
    student2.id = 123456
    student2.email = "test2@bilkent.edu.tr"
    student2.firstName = "Arda"
    student2.lastName = "Tavusbay"
    student2.password = "test"
    student2.department = "MATH"
    student2.exhangeType = ExchangeType.ERASMUS;
    student2.school = schoolEPFL.name;
    // student2.preApproval = null;
    // student2.learningAgreement = null;

    await updateStudent(student2);
    console.log("Saved a new Student with id: " + student2.id)
    ////////////////////////////////////////////////////////////////// SAVE STUDENT 2 END

}

async function getPreApproval2(id : number){
    console.log("Loading students from the database...");
    try {
        const std1 = await getStudent(id).then((student) => {
            console.log("Student id: " + student.id);
            console.log("Student name: " + student.firstName);
            console.log("Student surname: " + student.lastName);
            console.log("Student school: " + student.school);
            console.log("Student email: " + student.email);
            console.log("Student password: " + student.password);
            console.log("Student type: " + student.exhangeType);
            console.log("Student Approval : ", student.preApproval);

            if ( student.preApproval ){
                student.preApproval.approvedCourses.forEach((course) => {
                    console.log("Bilkent Course : ", course.bilkentCourse);
                    console.log();
                    course.approvedHostCourses.forEach((hostCourse) => {
                        console.log("Host Courses: ", hostCourse);
                        console.log();
                        // console.log("Host Name : "+  hostCourse.name + " Code: " + hostCourse.code + " Credit: " + hostCourse.credit );
                    });
                    console.log("-----------------------------------------------------------------");
                    // console.log("Course : "+  course.approvedHostCourses);
                });
            }
            else{
                // const approvedCoursesRepository = AppDataSource.getRepository(PreApproval);
                // const approvedCourses = new ApprovedCourse();
                const bilkentCoursesRepository = AppDataSource.getRepository(BilkentCourse);
                const bilkentCourse = new BilkentCourse();
                bilkentCourse.code = "CS 101";
                bilkentCourse.name = "Introduction to Programming";
                bilkentCourse.credit = 3;
                // bilkentCourse.courseType = CourseType.

                bilkentCoursesRepository.save(bilkentCourse).then((bilkentCourse) => {

                    console.log("Bilkent Course has been saved to the database.");
                    const approvedHostCoursesRepository = AppDataSource.getRepository(ApprovedHostCourse);
                    const approvedHostCourse = new ApprovedHostCourse();
                    approvedHostCourse.code = "MATH 345";
                    approvedHostCourse.name = "Test";
                    approvedHostCourse.credit = 5;
                    approvedHostCoursesRepository.save(approvedHostCourse).then((approvedHostCourse) => {
                        const approvedCoursesRepository = AppDataSource.getRepository(ApprovedCourse);
                        const approvedCourses = new ApprovedCourse();
                        approvedCourses.bilkentCourse = bilkentCourse;
                        approvedCourses.approvedHostCourses = [approvedHostCourse];
                        approvedCoursesRepository.save(approvedCourses).then((approvedCourses) => {

                            const preApprovalRepository = AppDataSource.getRepository(PreApproval);
                            const preApproval = new PreApproval();
                            preApproval.studentId = student.id;
                            preApproval.totalCredit = 5;
                            preApproval.status = "Coordinator Pending";
                            preApproval.approvedCourses = [approvedCourses];

                            preApprovalRepository.save(preApproval).then((preApproval) => {
                                console.log("Pre-Approval has been saved to the database.");
                                console.log("Pre-Approval id: " + preApproval.studentId);
                                student.preApproval = preApproval;
                                updateStudent(student).then((student) => {
                                    console.log("Student has been saved to the database.");
                                    console.log("Student id: " + student.id);
                                }).catch((error) => {
                                    console.log(error);
                                });

                            }).catch((error) => {
                                console.log(error);
                            });
                        }).catch((error) => {
                            console.log("Cannot save Approved Host Course to the database!");
                            console.log(error);
                        });

                    }).catch((error) => {
                        console.log("Cannot save Approved Host Course to the database!");
                        console.log(error);
                    });
                
                    
                }).catch((error) => {
                    console.log("Cannot save Bilkent Course to the database!");
                    console.log(error);
                });
                console.log("Student has no pre-approval");
            }

            // console.log("Student id: " + student.preApproval.approvedCourses);
        }).catch((error) => {
            console.log(error);
        });
        
        // console.log("Student id: " + std1.school);
    }
    catch(error){
        console.log(error);
    }
}

async function updatePreApprovalStatus(id : number, status : string){
    getStudent(id).then((student) => {
        if (student == null)
            throw new Error("Student not found in the database. Please check the student id.");

        if (student.preApproval != null){
            student.preApproval.status = "Approved";
            updateStudent(student).then((student) => {
                console.log("Student has been saved to the database.");
                console.log("Student id: " + student.id);
            }).catch((error) => {
                console.log(error);
            });
        }
        else{
            const bilkentCoursesRepository = AppDataSource.getRepository(BilkentCourse);
            const bilkentCourse = new BilkentCourse();
            bilkentCourse.code = "CS 101";
            bilkentCourse.name = "Introduction to Programming";
            bilkentCourse.credit = 3;
            // bilkentCourse.courseType = "Technical Elective";
            
            bilkentCoursesRepository.save(bilkentCourse).then((bilkentCourse) => {
                console.log("Bilkent Course has been saved to the database.");
    
                const approvedHostCoursesRepository = AppDataSource.getRepository(ApprovedHostCourse);
                const approvedHostCourse = new ApprovedHostCourse();
                approvedHostCourse.code = "MATH 345";
                approvedHostCourse.name = "Test";
                approvedHostCourse.credit = 5;
                
                approvedHostCoursesRepository.save(approvedHostCourse).then((approvedHostCourse) => {

                    const approvedCoursesRepository = AppDataSource.getRepository(ApprovedCourse);
                        const approvedCourses = new ApprovedCourse();
                        approvedCourses.bilkentCourse = bilkentCourse;
                        approvedCourses.approvedHostCourses = [approvedHostCourse];
                        approvedCoursesRepository.save(approvedCourses).then((approvedCourses) => {
                        const preApprovalRepository = AppDataSource.getRepository(PreApproval);
                        const preApproval = new PreApproval();
                        preApproval.studentId = student.id;
                        preApproval.totalCredit = 5;
                        preApproval.status = "Coordinator Pending";
                        preApproval.approvedCourses = [approvedCourses];
                        preApprovalRepository.save(preApproval).then((preApproval) => {
                                console.log("Pre-Approval has been saved to the database.");
                                console.log("Pre-Approval id: " + preApproval.studentId);
                                student.preApproval = preApproval;
                                updateStudent(student).then((student) => {
                                    console.log("Student has been saved to the database.");
                                    console.log("Student id: " + student.id);
                                }).catch((error) => {
                                    console.log(error);
                                });
        
                        }).catch((error) => {
                            console.log(error);
                        });
                    }).catch((error) => {
                        console.log("Cannot save Approved Host Course to the database!");
                        console.log(error);
                    });
            
                }).catch((error) => {
                    console.log("Cannot save Approved Host Course to the database!");
                    console.log(error);
                });
                            
                                
            }).catch((error) => {
                console.log("Cannot save Bilkent Course to the database!");
                console.log(error);
            });
        }

    }).catch((error) => {
        console.log(error);
    });     
}

async function createPreApproval(id : number){
    getStudent(id).then((student) => {
        if (student == null)
            throw new Error("Student not found in the database. Please check the student id.");

        if (student.preApproval != null){
            throw new Error("Student already has a pre-approval.");
        }
        else{
            const preApprovalRepository = AppDataSource.getRepository(PreApproval);
            const preApproval = new PreApproval();
            preApproval.studentId = student.id;
            preApproval.totalCredit = 0;
            preApproval.status = "Student Pending";
            preApprovalRepository.save(preApproval).then((preApproval) => {
                console.log("Pre-Approval has been saved to the database.");
                console.log("Pre-Approval id: " + preApproval.studentId);
                student.preApproval = preApproval;
                
                updateStudent(student).then((student) => {
                    console.log("Student has been saved to the database.");
                    console.log("Student id: " + student.id);
                }).catch((error) => {
                    console.log(error);
                });
            }).catch((error) => {
                console.log(error);
            });
        }
    }).catch((error) => {
        console.log(error);
    });     
}

async function updatePreApproval(id : number){
    getStudent(id).then((student) => {
        if (student == null)
            throw new Error("Student not found in the database. Please check the student id.");

        if (student.preApproval != null){
            throw new Error("Student already has a pre-approval.");
        }
        else{
            
            const bilkentCoursesRepository = AppDataSource.getRepository(BilkentCourse);
            const bilkentCourse = new BilkentCourse();
            bilkentCourse.code = "CS 101";
            bilkentCourse.name = "Introduction to Programming";
            bilkentCourse.credit = 3;
            // bilkentCourse.courseType = "Technical Elective";
            
            bilkentCoursesRepository.save(bilkentCourse).then((bilkentCourse) => {
                console.log("Bilkent Course has been saved to the database.");
    
                const approvedHostCoursesRepository = AppDataSource.getRepository(ApprovedHostCourse);
                const approvedHostCourse = new ApprovedHostCourse();
                approvedHostCourse.code = "MATH 345";
                approvedHostCourse.name = "Test";
                approvedHostCourse.credit = 5;
                
                approvedHostCoursesRepository.save(approvedHostCourse).then((approvedHostCourse) => {

                    const approvedCoursesRepository = AppDataSource.getRepository(ApprovedCourse);
                        const approvedCourses = new ApprovedCourse();
                        approvedCourses.bilkentCourse = bilkentCourse;
                        approvedCourses.approvedHostCourses = [approvedHostCourse];
                        approvedCoursesRepository.save(approvedCourses).then((approvedCourses) => {
                        const preApprovalRepository = AppDataSource.getRepository(PreApproval);
                        const preApproval = new PreApproval();
                        preApproval.studentId = student.id;
                        preApproval.totalCredit = 5;
                        preApproval.status = "Coordinator Pending";
                        preApproval.approvedCourses = [approvedCourses];
                        preApprovalRepository.save(preApproval).then((preApproval) => {
                                console.log("Pre-Approval has been saved to the database.");
                                console.log("Pre-Approval id: " + preApproval.studentId);
                                student.preApproval = preApproval;
                                updateStudent(student).then((student) => {
                                    console.log("Student has been saved to the database.");
                                    console.log("Student id: " + student.id);
                                }).catch((error) => {
                                    console.log(error);
                                });
        
                        }).catch((error) => {
                            console.log(error);
                        });
                    }).catch((error) => {
                        console.log("Cannot save Approved Host Course to the database!");
                        console.log(error);
                    });
            
                }).catch((error) => {
                    console.log("Cannot save Approved Host Course to the database!");
                    console.log(error);
                });
                            
                                
            }).catch((error) => {
                console.log("Cannot save Bilkent Course to the database!");
                console.log(error);
            });
        }

    }).catch((error) => {
        console.log(error);
    });     
}

function getPreApproval(id: number) : Promise<PreApproval>{
    
    const preApprovalRepository = AppDataSource.getRepository(PreApproval)
    preApprovalRepository.findOne({
        where: {
            studentId : id
        },
        relations: {
            approvedCourses : {
                bilkentCourse: true,
                approvedHostCourses: true
            }
        }
    }).then((preApproval) => {
        return preApproval;
    }).catch((error) => {
        throw new Error("Pre-Approval not found in the database. Please check the student id.");
        
    });

    return null;
    // return null;
}

function getStudent(id: number): Promise<Student>{
    
    const studentRepository = AppDataSource.getRepository(Student)
    const student = studentRepository.findOne({
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
    // if (student.department == null) {
    //     throw new Error("Student department not found");

    // const firstUser = await AppDataSource.getRepository(Student)
    //     .createQueryBuilder("user")
    //     .where("user.id = :id", { id: id })
    //     .getOne();
    // return student;
    return student;
}

function getStudent2(id: number): Student{
    
    const studentRepository = AppDataSource.getRepository(Student)
    const student = studentRepository.findOne({
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
    }).then((student) => {
        return student;
    }).catch((error) => {
        console.log(error);
    });

    return null;
}

function updateStudent(student: Student): Promise<Student>{

    const studentRepository = AppDataSource.getRepository(Student)
    
    if ( student == null) {
        throw new Error("Student not found");
    }
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
}

function updateStudentById(id : number, ): Promise<Student>{

    getStudent(id).then((student) => {
        if ( student == null) {
            throw new Error("Student not found");
        }
        const studentRepository = AppDataSource.getRepository(Student)
        
        if ( student == null) {
            throw new Error("Student not found");
        }
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
    
        studentRepository.save(student).then((student) => {
            console.log("Student has been updated");
            return student;
        }
        ).catch((error) => {
            console.log(error);
        }
        );
    }).catch((error) => {
        console.log(error);
    });
    return null;
}

async function createStudent(id : number, email: string, firstName: string, lastName: string, password: string, department: string, exhangeType: ExchangeType, schoolName : string){
    await getStudent(id).then(async (student) => {
        if (student != null) {
            throw new Error("Student already exists");
        }
        else {
            const studentRepository = AppDataSource.getRepository(Student)
            const student = new Student();
            student.id = id;
            student.email = email;
            student.firstName = firstName;
            student.lastName = lastName;
            student.password = password;
            student.department = department;
            student.exhangeType = exhangeType;
            student.school = schoolName;
            
            await studentRepository.save(student).then((student) => {
                console.log("Student has been saved to the database.");
                console.log("Student id: " + student.id);
                return student;
            }).catch(() => {
                throw Error("Student could not be saved to the database.");
            });
        }
    }).catch((error) => {
        throw error;
    });
}


function updateSchool(school: School): Promise<School>{

    const schoolRepository = AppDataSource.getRepository(School)

    if ( school == null) {
        throw new Error("School not found");
    }
    else if (school.name == null) {
        throw new Error("School name not found");
    }
    else if (school.country == null) {
        throw new Error("School country not found");
    }
    // else if (school.approvedCourses == null) {
    //     throw new Error("School approved courses not found");
    // }
    
    return schoolRepository.save(school);
}


