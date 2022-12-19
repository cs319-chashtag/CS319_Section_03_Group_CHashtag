import React from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../modal/modal_component";
import { useState } from "react";
import BilkentCourseCard from "./BilkentCourseCard";
import PartnerCourseCardList from "./PartnerCourseCardList";
import StudentTable from "./studentCourseTable";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import NotApprovedBilkentCourseSelection from "./notApprovedbilkentCourseSelection";
import NotApprovedHostCourseSelection from "./notApprovesHostCourseSelection";

/* Mostly done by @mr3mre 
 */
export default function StudentCourseComponent() {
    const navigate = useNavigate();
    const [ notApprovedNumber, setNotApprovedNumber ] = useState(0);
    const [ bilkentCourseNumber, setBilkentCourseNumber ] = useState(0);
    const [bilkentModalOn, setBilkentModalOn] = useState(false);
    const [hostModalOn, setHostModalOn] = useState(false);
    const [choice, setChoice] = useState(false);
    const [addCourseButton, setCourseButton] = useState(true);

    const [addNotApprovedCourseButton, setNotApprovedCourseButton] = useState(false);
    const [studentApprovedCourseArray, setStudentApprovedCourseArray] = useState(null);
    const [studentApprovedCourseClear, setStudentApprovedCourseClear] = useState(false);
    const [approvedCourseArray, setApprovedCourseArray] = useState([]);
    const [value, setValue] = useState("");

    const [studentNotApprovedBilkentCourse, setStudentNotApprovedBilkentCourse] = useState(null);
    const [studentNotApprovedHostCourseArray, setStudentNotApprovedHostCourseArray] = useState([]);
    const [studentNotApprovedHostCourse, setStudentNotApprovedHostCourse] = useState(null);
    const [ notApprovedHostCredit, setNotApprovedHostCredit ] = useState(0);


    const [ notApprovedCourseFinalArray, setNotApprovedCourseFinalArray ] = useState([]);
    const [ approvedCourseFinalArray, setApprovedCourseFinalArray ] = useState([]);

    // React.useEffect(() => {
    //     fetch('http://localhost:3000/')
    //         .then(courseData => {
    //         console.log("DATA : ", courseData);
    //     }).catch(err => {
    //         console.log("ERROR: ", err);
    //     })
    // }, []);
      


    React.useEffect(() => {
        setApprovedCourseArray(ApprovedCourseData2);
        // console.log("approvedCourseArray: ", approvedCourseArray[0]);
    }, []);

    React.useEffect(() => {
        // console.log("\n\nINSIDE USE EFFECT studentNotApprovedCourseArray: ", studentNotApprovedBilkentCourse);
        // console.log("approvedCourseArray: ", approvedCourseArray[0]);
    }, [studentNotApprovedBilkentCourse]);

    React.useEffect(() => {
        console.log("studentNotApprovedHostCourseArray: " , studentNotApprovedHostCourseArray);
    }, [studentNotApprovedHostCourseArray]);

    React.useEffect(() => {
        if (studentNotApprovedHostCourse != null  ){
            // console.log("studentNotApprovedHostCourseArray: ", studentNotApprovedHostCourseArray);
            const insertAt = 1; // Could be any index
            const newStudentNotApprovedHostCourseArray = [
                // Items before the insertion point:
                ...studentNotApprovedHostCourseArray.slice(0, insertAt),
                // New item:
                { 
                    hostCode: studentNotApprovedHostCourse.hostCode, 
                    name: studentNotApprovedHostCourse.name,
                    credit : studentNotApprovedHostCourse.credit,
                    // info : studentNotApprovedHostCourse.info,
                },
                // Items after the insertion point:
                ...studentNotApprovedHostCourseArray.slice(insertAt)
            ];
            setNotApprovedHostCredit( notApprovedHostCredit + studentNotApprovedHostCourse.credit)
            setStudentNotApprovedHostCourseArray(newStudentNotApprovedHostCourseArray);
        }
    }, [studentNotApprovedHostCourse]);

    function filterApprovedCourse(value) {
        var checkExist = false;
        for (const approvedCourse of approvedCourseArray) {
          for (const hostCourse of approvedCourse.hostCourses) {
            // console.log("hostCourse: ", hostCourse.hostCode);
            if (hostCourse.hostCode === value) {
              // console.log("hostCourse: ", hostCourse);
              setStudentApprovedCourseArray(approvedCourse);
              checkExist = true;
            }
          }
        }
        // if (checkExist === false) {
        //   console.log("CheckExis:", checkExist);
        //   setStudentCourseArray([]);
        // }
      }
    //   React.useEffect(() => {
    //     if (studentCourseArray != null) {

    //        console.log("INSIDE USE EFFECT studentCourseArray: ", studentCourseArray);
    //     //    setStudentCourseClear(true);
    //     }
    //     else{
    //         console.log("INSIDE USE EFFECT studentCourseArray is empty: ", studentCourseArray );
    //         // setStudentCourseClear(false);
    //     }
        
    //   }, [studentCourseArray]);
      
      React.useEffect(() => {
        if (value && !studentApprovedCourseClear) {
          filterApprovedCourse(value.label);
          setStudentApprovedCourseClear(true);
          // for (const approvedCourse of approvedCourseArray) {
          //   for (const hostCourse of approvedCourse.hostCourses) {
          //     if ((hostCourse.hostCode = value.hostCode)) {
          //       setStudentCourseArray(approvedCourse);
          //     }
          //   }
          // }
          // studentCourseArray.push(value);
          //   console.log("studentCourseArray:", studentCourseArray);
          // console.log("Value: ", value.hostCode);
        }
        else {
            if ( studentApprovedCourseArray != null ) {
                setStudentApprovedCourseClear(false);
                setStudentApprovedCourseArray(null);
            }
            // else{
            //     setStudentCourseClear(false);
            // }
        }
        if (studentApprovedCourseClear){
            console.log("studentCourseArray is setted to []:", studentApprovedCourseArray);
        }
        else{
            console.log("studentCourseArray : ", studentApprovedCourseArray);
        }
      }, [value]);

    // console.log("studentCourseArray: OUTSIDE OF FUNCTION ", studentCourseArray);
    const hostCourseAddButtonClicked = () => {
        // setNotApprovedNumber(notApprovedNumber + 1);
        setHostModalOn(true);
    };

    const bilkentCourseAddButtonClicked = () => {
        setBilkentCourseNumber(bilkentCourseNumber);
        setBilkentModalOn(true);
    };

    function returnToTablePage(){
        setNotApprovedCourseButton(false);
        setValue("");
        setCourseButton(true);
        setStudentNotApprovedBilkentCourse(null);
        setStudentNotApprovedHostCourseArray([]);
        setBilkentCourseNumber(0);
        setNotApprovedNumber(0);
        setNotApprovedHostCredit(0);
    }

    function setSaveToDatabaseButton(){



        setNotApprovedCourseFinalArray([]);
        setApprovedCourseFinalArray([]);
    }

    function addStudentToPreApprovalForm(){
        if ( studentNotApprovedBilkentCourse != null && studentNotApprovedHostCourseArray.length != 0 ){
            setNotApprovedCourseFinalArray( {
                bilkentCourse : studentNotApprovedBilkentCourse,
                hostCourses : studentNotApprovedHostCourseArray,
            });
        }
        if ( studentApprovedCourseArray != null){
            setApprovedCourseFinalArray( {
                bilkentCourse : studentApprovedCourseArray.bilkentCourse,
                hostCourses : studentApprovedCourseArray.hostCourses,
            });
        }
        returnToTablePage();
    }
    
    var counter = 0;
    // const ApprovedCourseData = {
    //     bilkentCourse : {
    //         bilkentCode : "Math 260",
    //         name : "Intro to Computer Science",
    //         type : "Mandatory",
    //         credit : 4,
    //     },
    //     hostCourses : [
    //         {
    //             hostCode : "CS 101",
    //             name : "Introduction to Computer Science",
    //             credit : 3,
    //         },
    //         {
    //             hostCode : "CS 101",
    //             name : "Introduction to Computer Science",
    //             credit : 3,
    //         },
    //         {
    //             hostCode : "CS 101",
    //             name : "Introduction to Computer Science",
    //             credit : 3,
    //         },
    //         {
    //             hostCode : "CS 101",
    //             name : "Introduction to Computer Science",
    //             credit : 3,
    //         },
    //         {
    //             hostCode : "CS 101",
    //             name : "Introduction to Computer Science",
    //             credit : 3,
    //         },
    //     ]
    // };

    const ApprovedCourseData2 = [
        {
          bilkentCourse: {
            bilkentCode: "CS 201",
            name: "Intro to Computer Science",
            type: "Mandatory",
            credit: 4
          },
          hostCourses: [
            {
              hostCode: "CS 105",
              name: "Introduction to Computer Science",
              credit: 3
            },
            {
              hostCode: "CS 101",
              name: "Introduction to Computer Science",
              credit: 3
            },
            {
              hostCode: "CS 102",
              name: "Introduction to Computer Science",
              credit: 3
            },
            {
              hostCode: "CS 103",
              name: "Introduction to Computer Science",
              credit: 3
            },
            {
              hostCode: "CS 104",
              name: "Introduction to Computer Science",
              credit: 3
            }
          ]
        },
        {
          bilkentCourse: {
            bilkentCode: "Technical Elective",
            name: "Intro to Computer Science",
            type: "Elective",
            credit: 4
          },
          hostCourses: [
            {
              hostCode: "CS 202",
              name: "Introduction to Computer Science",
              credit: 3
            },
            {
              hostCode: "CS 109",
              name: "Introduction to Computer Science",
              credit: 3
            }
          ]
        },
        {
            bilkentCourse: {
              bilkentCode: "General Elective",
              name: "",
              type: "Elective",
              credit: 3
            },
            hostCourses: [
              {
                hostCode: "CS 205",
                name: "Introduction to Computer Science",
                credit: 3
              },
              {
                hostCode: "CS 109",
                name: "Introduction to Computer Science",
                credit: 3
              }
            ]
          }
    ];

    return (
        <div class="antialiased bg-white w-full min-h-screen text-black relative py-4">
            {bilkentModalOn && 
            // <Modal setModalOn={setModalOn} setChoice={setChoice} />
            <NotApprovedBilkentCourseSelection 
                setModalOn={setBilkentModalOn} 
                setChoice={setChoice} 
                setBilkentCourseNumber={setBilkentCourseNumber} 
                bilkentCourseNumber= {bilkentCourseNumber}
                setStudentNotApprovedBilkentCourse = {setStudentNotApprovedBilkentCourse}
            />
            }
            {hostModalOn &&
            <NotApprovedHostCourseSelection
                setModalOn={setHostModalOn}
                setChoice={setChoice}
                setNotApprovedNumber={setNotApprovedNumber}
                notApprovedNumber={notApprovedNumber}
                setStudentNotApprovedHostCourse = {setStudentNotApprovedHostCourse}
            />
            }

            <div class="grid grid-cols-10 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-4 max-w-7xl my-10 ">
                <div
                    id="menu"
                    class="w-64 border border-black bg-white/10 col-span-2 rounded-lg p-4 "
                >
                    <a
                        href="#"
                        class="flex flex-col space-y-2 md:space-y-0 md:flex-row mb-5 items-center md:space-x-2 hover:bg-white/10 group transition duration-150 ease-linear rounded-lg group w-full py-3 px-2"
                    >
                        <div>
                            <img
                                class="rounded-full w-10 h-10 relative object-cover"
                                src={require("../../assets/photo.jpg")}
                                alt=""
                            />
                        </div>
                        <div>
                            <p class="font-medium text-black group-hover:text-indigo-400 leading-4">
                                Arda Tavusbay
                            </p>
                            <span class="text-xs text-slate-400">
                                Erasmouse Student
                            </span>
                        </div>
                    </a>
                    <hr class="my-2 border-black" />
                    <div id="menu" class="flex flex-col space-y-2 my-5">
                        <a
                            href="#"
                            onClick={() => {
                                navigate("/student");
                            }}
                            class="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group">
                            <div class="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="w-6 h-6 group-hover:text-indigo-400"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p class="font-bold text-base lg:text-lg text-black leading-4 group-hover:text-indigo-400">
                                        Homepage
                                    </p>
                                    <p class="text-slate-400 text-sm hidden md:block">
                                        Data overview
                                    </p>
                                </div>
                            </div>
                        </a>
                        <a
                            href="#"
                            onClick={() => {
                                navigate("/student/preapprovalForms");
                            }}
                            class="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group"
                        >
                            <div class="relative flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="w-6 h-6 group-hover:text-indigo-400"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p class="font-bold text-base lg:text-lg text-black leading-4 group-hover:text-indigo-400">
                                        Pre-Approval Forms
                                    </p>
                                    <p class="text-slate-400 text-sm hidden md:block">
                                        View Form
                                    </p>
                                </div>
                            </div>
                        </a>
                        <a
                            href="#"
                            onClick={() => {
                                navigate("/student/learningAgreement");
                            }}
                            class="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group"
                        >
                            <div class="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="w-6 h-6 group-hover:text-indigo-400"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p class="font-bold text-base lg:text-lg text-black leading-4 group-hover:text-indigo-400">
                                        Learning Agreement
                                    </p>
                                    <p class="text-slate-400 text-sm hidden md:block">
                                        View Agreement
                                    </p>
                                </div>
                            </div>
                        </a>
                        <a
                            href="#"
                            onClick={() => {
                                navigate("/student/profile");
                            }}
                            class="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group"
                        >
                            <div class="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="w-6 h-6 group-hover:text-indigo-400"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                                        />
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p class="font-bold text-base lg:text-lg text-black leading-4 group-hover:text-indigo-400">
                                        Profile
                                    </p>
                                    <p class="text-slate-400 text-sm hidden md:block">
                                        Edit Profile
                                    </p>
                                </div>
                            </div>
                        </a>
                        <a
                            href="#"
                            onClick={() => {
                                navigate("/student/help");
                            }}
                            class="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group"
                        >
                            <div class="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="w-6 h-6 group-hover:text-indigo-400"
                                    >
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                        <line
                                            x1="12"
                                            y1="17"
                                            x2="12.01"
                                            y2="17"
                                        ></line>
                                    </svg>
                                </div>
                                <div>
                                    <p class="font-bold text-base lg:text-lg text-black leading-4 group-hover:text-indigo-400">
                                        Help
                                    </p>
                                    <p class="text-slate-400 text-sm hidden md:block">
                                        Show Help
                                    </p>
                                </div>
                            </div>
                        </a>
                        <a
                            href="#"
                            onClick={() => {
                                navigate("/loginPage");
                            }}
                            class="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group"
                        >
                            <div class="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="w-6 h-6 group-hover:text-indigo-400"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p class="font-bold text-base lg:text-lg text-black leading-4 group-hover:text-indigo-400">
                                        Logout
                                    </p>
                                </div>
                            </div>
                        </a>
                    </div>
                    <p class="text-sm text-center text-gray-600">
                        v0.1 | &copy; Erasmouse
                    </p>
                </div>
                <div
                    id="content"
                    class="border border-black bg-white/10 col-span-8 rounded-lg p-6"
                >
                    <div className="flex">
                        <div id="title">
                            <h1 class="font-bold text-black text-3xl py-4 uppercase">
                                Student Actions - Courses
                                <br />
                            </h1>
                        </div>
                        {addCourseButton  ? 
                            (notApprovedCourseFinalArray.length == 0 && approvedCourseFinalArray.length == 0) ?
                            <div className="py-4 ml-auto">
                                <div className="p-2  border border-black rounded-lg">
                                    <button className=" gap-2 flex" onClick={() => setCourseButton(false)}>
                                        <img src="https://img.icons8.com/material-outlined/24/null/plus-math--v1.png" />
                                        Add New Course
                                    </button>
                                </div>
                            </div>
                            :
                            <div className="py-4 ml-auto">
                                <div className="p-2  border border-black rounded-lg">
                                    <button className=" gap-2 flex" onClick={() => setSaveToDatabaseButton}>
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        
                        : 
                        <div className="py-4 ml-auto gap-4">
                            {!addNotApprovedCourseButton ? 
                            <Autocomplete
                                value={value}
                                onChange={(event, newValue) => {
                                  setValue(newValue);
                                }}
                                disablePortal
                                id="combo-box-demo"
                                options={HostCourseList}
                                sx={{ width: 300 }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Select Host Code" />
                                )}
                            />
                            : null
                            }
                            {!addNotApprovedCourseButton && !studentApprovedCourseClear ? 
                            <div className="p-2  border border-black rounded-lg">
                                <button className=" gap-2 flex" onClick={() => setNotApprovedCourseButton(true)}>
                                    Add Not Approved Course
                                </button>
                            </div> 
                            : null
                            }
                            <div className="p-2  border border-black rounded-lg">
                                <button className=" gap-2 flex" onClick={() => returnToTablePage()}>
                                    Return My Courses
                                </button>
                            </div>
                        </div>
                        }
                        
                    </div>
                    
                    {addCourseButton ? 
                    // ApprovedCourseData = {ApprovedCourseData2} 
                    <StudentTable 
                        notApprovedCourseFinalArray = {notApprovedCourseFinalArray} 
                        approvedCourseFinalArray = {approvedCourseFinalArray} 
                        // setStudentNotApprovedHostCourseArray= {setStudentNotApprovedHostCourseArray}
                    /> 
                    : 
                    <div id="container">
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-6 gap-4">
                            <div class="relative col-span-3 p-6 border border-black rounded-lg">
                                <div className="text-black pb-4">
                                    Courses - Partner University
                                </div>
                                { studentApprovedCourseArray != null ?
                                <div class="relative grid grid-rows gap-2">
                                    <PartnerCourseCardList hostCourses={studentApprovedCourseArray.hostCourses}/>
                                </div>
                                : null
                                }
                                { studentNotApprovedHostCourseArray.length > 0 ?
                                    <div class="relative grid grid-rows gap-2">
                                    <PartnerCourseCardList hostCourses={studentNotApprovedHostCourseArray}/>
                                    </div>
                                    : 
                                    null
                                }
                                { studentApprovedCourseArray == null && studentNotApprovedHostCourseArray.length == 0 ?
                                <div> Please select a course from the list </div>
                                : null
                                }
                                { notApprovedNumber < 5 && addNotApprovedCourseButton ? 
                                <div className="p-2 w-40 border border-black rounded-lg m-auto mt-6 bottom-0 right-0">
                                    <button
                                        className="gap-2 flex"
                                        type="button"
                                        data-modal-toggle="defaultModal"
                                        onClick={hostCourseAddButtonClicked}
                                        // onClick={() => {setNotApprovedNumber(notApprovedNumber + 1)}}
                                    >
                                    <img src="https://img.icons8.com/material-outlined/24/null/plus-math--v1.png" />
                                        Add Host Course(s) You Want To Take
                                    </button>
                                </div> 
                                : null }
                                
                            </div>
                            <div class="relative col-span-3 p-6 border border-black rounded-lg">
                                <div className="text-black pb-4">
                                    Bilkent Course
                                </div>
                                { studentApprovedCourseArray != null ?
                                <div > 
                                    <div class="relative grid grid-rows gap-2">
                                        <BilkentCourseCard
                                            bilkentCourse = {studentApprovedCourseArray.bilkentCourse}
                                        />
                                    </div>
                                </div>
                                : null
                                }
                                { studentNotApprovedBilkentCourse != null ? 
                                    <div class="relative grid grid-rows gap-2">
                                    <BilkentCourseCard
                                        bilkentCourse = {studentNotApprovedBilkentCourse}
                                    />
                                    </div>
                                    :
                                    null
                                }
                                { studentNotApprovedBilkentCourse == null && studentApprovedCourseArray == null ?
                                <div> Please select a course from the list </div>
                                : null
                                }
                                { bilkentCourseNumber < 1 && addNotApprovedCourseButton ? 
                                <div className="p-2 w-40 border border-black rounded-lg m-auto mt-6 bottom-0 right-0">
                                    <button
                                        className="gap-2 flex"
                                        type="button"
                                        data-modal-toggle="defaultModal"
                                        onClick={bilkentCourseAddButtonClicked}
                                    >
                                        <img src="https://img.icons8.com/material-outlined/24/null/plus-math--v1.png" />
                                        Add Bilkent Course Equivalent
                                    </button>
                                </div>
                                
                                : null }
                            </div>
                            {  (studentApprovedCourseArray != null || (studentNotApprovedHostCourseArray.length != 0 && studentNotApprovedBilkentCourse != null)) ?

                            <div class= "relative col-span-6 flex-auto content-evenly content-around justify-center gap-7 justify-items-center grid grid-flow-col-dense" >
                            <div className="justify-around p-2 border border-black rounded-lg m-auto">
                                {
                                    (notApprovedHostCredit >= 3) || studentApprovedCourseArray ? 

                                    <button
                                        className="gap-2 flex"
                                        type="button"
                                        data-modal-toggle="defaultModal"
                                        onClick={addStudentToPreApprovalForm}
                                    >
                                        <img src="https://img.icons8.com/material-outlined/24/null/plus-math--v1.png" />
                                        Add to Pre Approval Form
                                    </button>
                                    : 
                                    <div> You need to take at least 3 ECTS credits to apply for pre-approval </div>
                                }
                            </div>
                            </div>

                            : null
                            }
                        </div>
                    </div>
                    }
                    
                </div>
            </div>
        </div>
    );
}


const HostCourseList = [
    {
      label: "CS 101",
      name: "Introduction to Computer Science",
      credit: 3
    },
    {
      label: "CS 102",
      name: "Introduction to Computer Science",
      credit: 3
    },
    {
      label: "CS 103",
      name: "Introduction to Computer Science",
      credit: 3
    },
    {
      label: "CS 104",
      name: "Introduction to Computer Science",
      credit: 3
    },
    {
      label: "CS 105",
      name: "Introduction to Computer Science",
      credit: 3
    },
    {
      label: "CS 202",
      name: "hI TEHER",
      credit: 3
    }
];


 
