import { AppDataSource } from "./data-source"
import { Student, ExchangeType, SemesterType } from "./entity/UsersEntity/Student"
import { Coordinator } from "./entity/UsersEntity/Coordinator"
import { School } from "./entity/SchoolEntity/School"
import { ApprovedCourse } from "./entity/CoursesEntity/ApprovedCourse"
import { ApprovedHostCourse } from "./entity/CoursesEntity/ApprovedHostCourse"
import { BilkentCourse, CourseType } from "./entity/CoursesEntity/BilkentCourse"
import { ApprovalStatus, PreApproval } from "./entity/ApprovalsEntity/PreApproval"
// import { Administration } from "./entity/UsersEntity/Administration"
import  StudentRepo , {PreApprovalItem}  from "./repository/StudentRepo"
import schoolRepo from "./repository/SchoolRepo"
import CoordinatorRepo from "./repository/CoordinatorRepo"
import { DepartmentType, UserType } from "./entity/UsersEntity/User"

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
    status : ApprovalStatus.STUDENT_PENDING,
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
    console.log("Initialized");
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
    const student = new Student();
    student.id = 2190226;
    student.email = "tes2t@ug";
    student.department = DepartmentType.CS;
    student.firstName = "Test";
    student.lastName = "Test2";
    student.password = "123456";
    student.exhangeType = ExchangeType.BILETERAL;
    student.semesterType = SemesterType.FALL;
    student.userType = UserType.STUDENT;
    console.log( "RESULT: ", await StudentRepo.create(student) );

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


