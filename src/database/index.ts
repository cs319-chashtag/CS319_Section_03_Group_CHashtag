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
import AdministrationRepo from "./repository/AdministrationRepo"
import SchoolRepo from "./repository/SchoolRepo"
import UserRepo from "./repository/UserRepo"
import BilkentUniRepo from "./repository/BilkentUniRepo"
import ApprovedCourseRepo from "./repository/ApprovedCourseRepo"

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

    // BilkentUniRepoTest(); /// DONE

    // SchoolRepoTest();

    // ApprovedCourseRepoTest(); // DONE

    // CoordinatorRepoTest();

    // AdministrationRepoTest();

    
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
    // const id = 134253;
    // const email = "c1@ug.bilkent.edu.tr";
    // const department = DepartmentType.CS;
    // const firstName = "Test";
    // const lastName = "Test2";
    // const password = "123456";
    // const exhangeType = ExchangeType.BILETERAL;
    // const semesterType = SemesterType.FALL;;
    // const schoolName = "ETH";
    
    // console.log( "RESULT: ", await StudentRepo.create(id, email, firstName, lastName, password, department, exhangeType, semesterType, schoolName) );

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
}).catch(error => console.log("TypeORM connection error: ", error))


// create(name: string, department: DepartmentType): Promise<boolean | null>;
// addDepartment(name: string, department: DepartmentType): Promise<boolean | null>;
// removeDepartment(name: string, department: DepartmentType): Promise<boolean | null>;
// addApprovedCourse(name: string, department: DepartmentType, course: BilkentCourse): Promise<boolean | null>;
// removeApprovedCourse(name: string, department: DepartmentType, course: BilkentCourse): Promise<boolean | null>;
// getApprovedCoursesByNameAndDepartment(name: string, department: DepartmentType): Promise<ApprovedCourse[] | null>;
// getSchoolsByName(name: string): Promise<School[] | null>;
// getSchoolsByDepartment(department: DepartmentType): Promise<School[] | null>;
// getSchoolByNameAndDepartment(name: string, department: DepartmentType): Promise<School | null>;
// getAllSchools(): Promise<School[] | null>;
// removeSchool(name: string): Promise<boolean | null>;
async function SchoolRepoTest(){

    var schoolName = "ETH";
    console.log("Result of school: " , await SchoolRepo.create(schoolName, DepartmentType.CS));

    // console.log("Result of " + schoolName + " : " + DepartmentType.CHEM + ""  , await SchoolRepo.create(schoolName, DepartmentType.CHEM));
    // console.log("Result of " + schoolName + " : " + DepartmentType.MATH + ""  , await SchoolRepo.create(schoolName, DepartmentType.MATH));
    // console.log("Result of " + schoolName + " : " + DepartmentType.PHYS + ""  , await SchoolRepo.create(schoolName, DepartmentType.PHYS));

    // console.log( "RESULT : ", await SchoolRepo.getSchoolsByDepartment(DepartmentType.CS));

    // console.log( "RESULT BY NAME : ", await SchoolRepo.getSchoolsByName("EPFL"));

    // console.log( "RESULT ALL SCHOOLS : ", await SchoolRepo.getAllSchools());

    // console.log("Result of " + schoolName + " :  "  , await SchoolRepo.removeDepartment(schoolName, DepartmentType.ECON));

    // console.log( "REMOVE SCHOOL : ", await SchoolRepo.removeSchool(schoolName));


////// APPROVED COURSES TESTS
    // const bilkentCoursesRepository = AppDataSource.getRepository(BilkentCourse);
    // const bilkentCourse = new BilkentCourse();
    // bilkentCourse.code = "CS 353"
    // bilkentCourse.name = "Database Systems"
    // bilkentCourse.credit = 3
    // bilkentCourse.courseType = CourseType.MANDATORY;
    // bilkentCourse.department = DepartmentType.CS;

    // await bilkentCoursesRepository.save(bilkentCourse);
    
    // const approvedHostCourseRepository = AppDataSource.getRepository(ApprovedHostCourse);
    // const approvedHostCourse = new ApprovedHostCourse();
    // approvedHostCourse.code = "CS-322"
    // approvedHostCourse.name = "Introduction to Database Systems"
    // approvedHostCourse.credit = 4
    // approvedHostCourse.department = DepartmentType.CS;
    // approvedHostCourse.school = schoolName;
    // await approvedHostCourseRepository.save(approvedHostCourse);

    // const approvedCoursesRepository = AppDataSource.getRepository(ApprovedCourse); 
    // const approvedCourse = new ApprovedCourse();
    // approvedCourse.bilkentCourse = bilkentCourse;
    // // approvedCourse.school = ;
    // approvedCourse.school = await SchoolRepo.getSchoolByNameAndDepartment(schoolName, DepartmentType.CS);
    // approvedCourse.approvedHostCourses = [approvedHostCourse];
    // await approvedCoursesRepository.save(approvedCourse);

    // console.log( " addApprovedCourse : " , await SchoolRepo.addApprovedCourse(schoolName, DepartmentType.CS, approvedCourse));
    // console.log( "removeApprovedCourse : " , await SchoolRepo.removeApprovedCourse(schoolName, DepartmentType.CS, approvedCourse));
    // console.log( "getApprovedCoursesByNameAndDepartment : ", await SchoolRepo.getApprovedCoursesByNameAndDepartment(schoolName, DepartmentType.CS));
//     console.log( "Result of school: " , await SchoolRepo.create("ETH", DepartmentType.EEE));
//     console.log( "Removing of school: " , await SchoolRepo.removeDepartment("ETH", DepartmentType.CS));
//     console.log( "Removing of school2: " , await SchoolRepo.addDepartment("ETH", DepartmentType.MATH));


}

async function AdministrationRepoTest(){

    const idAdmini = 234567;
    const emailAdmini = "administration@ug.bilkent.edu.tr";
    const departmentAdmin = DepartmentType.CS;
    const firstNameAdmin = "Yelda";
    const lastNameAdmin = "Ates";
    const passwordAdmin = "yelda";

    // create(id : number, email: string, firstName: string, lastName: string, password: string, department: DepartmentType)
    console.log( "Result Administration: " , await AdministrationRepo.create(idAdmini, emailAdmini, firstNameAdmin, lastNameAdmin, passwordAdmin, departmentAdmin));
    console.log( "Administration Found: ", await AdministrationRepo.findAdministrationByDepartment(DepartmentType.CS) );
}


async function CoordinatorRepoTest(){
    const idCoor = 21432435;
    const emailCoor = "c1@ug.bilkent.edu.tr";
    const departmentCoord = DepartmentType.CS;
    const firstNameCoor = "Can";
    const lastNameCoord = "Alkan";
    const passwordCoord = "canPassword";

    const idCoor2 = 1453635;
    const emailCoor2 = "c2@ug.bilkent.edu.tr";
    const departmentCoord2 = DepartmentType.CS;
    const firstNameCoor2 = "Aysegul";
    const lastNameCoord2 = "Dundar";
    const passwordCoord2 = "aysegulPasssword";

    console.log( "Result Coordinator: " , await CoordinatorRepo.create(idCoor, emailCoor, firstNameCoor, lastNameCoord, passwordCoord, departmentCoord));

    console.log( "Result Coordinator2: " , await CoordinatorRepo.create(idCoor2, emailCoor2, firstNameCoor2, lastNameCoord2, passwordCoord2, departmentCoord2));

    console.log( "Result Coordinator: " , await CoordinatorRepo.findCoordinatorByDepartment(DepartmentType.CS) );
}

async function StudentRepoTest(){
    const idStudent = 21432435;
    const emailStudent = "";
    


}

async function UserRepoTest(){
    console.log( "Result User: ", await UserRepo.getUserById(21432435) );
    console.log( "Result Coordinator: " , await CoordinatorRepo.findCoordinatorByDepartment(DepartmentType.CS) );
}


//DONE WITH TESTS 
async function BilkentUniRepoTest(){
    //department : DepartmentType, courseCode: string, courseName: string, courseType: CourseType, courseCredit: number

    // console.log("Adding Bilkent: ", await BilkentUniRepo.addBilkentCourse(DepartmentType.CS,"CS 353", "Database Systems",  CourseType.MANDATORY,3));
    // console.log("Adding Bilkent: ", await BilkentUniRepo.addBilkentCourse(DepartmentType.CS,"Technical Elective", "",  CourseType.ELECTIVE,3));
    // console.log("Adding Bilkent Technical Elective: ", await BilkentUniRepo.addBilkentCourse(DepartmentType.CS,"Technical Elective", "",  CourseType.ELECTIVE,3));
    // console.log("Adding Bilkent CS 473: ", await BilkentUniRepo.addBilkentCourse(DepartmentType.CS,"CS473", "Algorithms I",  CourseType.MANDATORY,3));
    // console.log("Adding Bilkent Art Core Elective: ", await BilkentUniRepo.addBilkentCourse(DepartmentType.CS,"Arts Core Elective", "",  CourseType.ELECTIVE,3));
    // console.log("Adding Bilkent CS342: ", await BilkentUniRepo.addBilkentCourse(DepartmentType.CS,"CS342", "Operating Systems",  CourseType.MANDATORY,4));
    // console.log("Adding Bilkent Technical Elective CS 421: ", await BilkentUniRepo.addBilkentCourse(DepartmentType.CS,"Technical Elective", "CS 421",  CourseType.ELECTIVE,3));
    // console.log("Adding Bilkent Technical Elective CS 411: ", await BilkentUniRepo.addBilkentCourse(DepartmentType.CS,"Technical Elective", "CS 411",  CourseType.ELECTIVE,3));
    // console.log("Adding Bilkent: ", await BilkentUniRepo.addBilkentCourse(DepartmentType.ME,"Technical Elective", "MATH 260",  CourseType.ELECTIVE,3));

    // console.log("Removing Bilkent: ", await BilkentUniRepo.removeBilkentCourse(DepartmentType.CS,"CS473", "Algorithms I",  CourseType.MANDATORY));
    // console.log("Removing Bilkent: ", await BilkentUniRepo.removeBilkentCourse(DepartmentType.CS,"Technical Elective", "",  CourseType.ELECTIVE));
    // console.log("getBilkentCoursesByCode: ", await BilkentUniRepo.getBilkentCoursesByCode(DepartmentType.CS,"Technical Elective"));

    // console.log("\n\ngetBilkentCoursesByCourseType: ", await BilkentUniRepo.getBilkentCoursesByCourseType(DepartmentType.CS, CourseType.MANDATORY ));

    // console.log("getBilkentCourseByCodeAndName: ", await BilkentUniRepo.getBilkentCourseByCodeAndName(DepartmentType.CS, "Technical Elective", "MATH 260" ));
    // console.log( "Result Bilkent: ", await BilkentUniRepo.getAllBilkentCoursesByDepartment(DepartmentType.CS) );
    
    // console.log("\n--------------------------\n");
    // console.log( "Result All Bilkent Courses: ", await BilkentUniRepo.getAllBilkentCourses() );
}

//DONE WITH TESTS
async function ApprovedCourseRepoTest(){
    const uniName = "ETH";
    const dep = DepartmentType.CS;
    console.log( "Approved Course Created: " , await ApprovedCourseRepo.createApprovedCourse(uniName,dep) );

    //(schoolName : string, department: DepartmentType, courseCode: string, courseName: string, courseCredit: number)
    console.log( "Adding Approved Host Course" ,await ApprovedCourseRepo.addApprovedHostCourse(uniName, dep, "INF4032", "System Programming",  2) );
    console.log( "Adding Approved Host Course2 " ,await ApprovedCourseRepo.addApprovedHostCourse(uniName, dep, "INF4032", "Computer Networks",  2) );


    console.log( "Adding Bilkent Course " , await ApprovedCourseRepo.addBilkentCourse(uniName, dep, "Technical Elective", "CS 421") );

    console.log( "Removing Bilkent Course ", await ApprovedCourseRepo.removeApprovedCourse(uniName, dep, "Technical Elective", "CS 421") );
    // console.log( await ApprovedCourseRepo.getApprovedCoursesBySchoolAndDepartment(uniName, dep) );

    const approvedCourses = await SchoolRepo.getApprovedCoursesByNameAndDepartment(uniName, dep)
    console.log("\n\nSchool: ", await SchoolRepo.getApprovedCoursesByNameAndDepartment(uniName, dep) );
    console.log("Approved Courses: ", approvedCourses);
}

