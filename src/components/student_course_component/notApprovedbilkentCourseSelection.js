import * as React from 'react';
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from "@mui/material/Autocomplete";

/* Done by @mr3mre 
 */
export default function NotApprovedBilkentCourseSelection({ setModalOn, setChoice, setBilkentCourseNumber, bilkentCourseNumber, setStudentNotApprovedBilkentCourse }){
    const [value, setValue] = useState("");
    const [bilkentCourseChoice, setBilkentCourseChoice] = useState(null);
    const [bilkentCourseData, setBilkentCourseData] = useState(null);
    const [bilkentCourseChoiceClear, setBilkentCourseChoiceClear] = useState(null);


    const BilkentData = [
        {
            bilkentCode : "Math 260",
            name : "Intro to Computer Science",
            type : "Mandatory",
            credit : 4,
        },
        {
            bilkentCode : "Math 260",
            name : "Intro to Computer Science",
            type : "Mandatory",
            credit : 4,
        },
        {
            bilkentCode : "CS 319",
            name : "Computer Scie",
            type : "Elective",
            credit : 4,
        },
        {
            bilkentCode : "CS 319",
            name : "Computer Scie",
            type : "Elective",
            credit : 4,
        },
    ]

    const bilkentData2 = [];
    for ( const course  of  BilkentData) {
        bilkentData2.push({label : course.bilkentCode});
    }

    useEffect(() => {
        setBilkentCourseData(bilkentData2);
    }, []);

    useEffect(() => {
        console.log("VALUE: ", value);
        if (value) {
          for ( const bilkentCourse of BilkentData){
            // console.log("bilkentCourse.bilkentCode: ", bilkentCourse);
            if ( bilkentCourse.bilkentCode === value.label){
                // console.log("bilkentCourse: ", bilkentCourse);
                setBilkentCourseChoice(bilkentCourse);
                // setStudentNotApprovedCourseArray(bilkentCourse);
            }
          }
        }
        else {
            if ( bilkentCourseChoice != null ) {
                setBilkentCourseChoiceClear(false);
                setBilkentCourseChoice(null);
            }
        }
    }, [value]);
    console.log("bilkentCourseChoice: ", bilkentCourseChoice);

    // console.log
    const handleOKClick = () => {
        setChoice(true);
        setModalOn(false);
        setBilkentCourseNumber(bilkentCourseNumber + 1);
        setStudentNotApprovedBilkentCourse(bilkentCourseChoice);
    };
    const handleCancelClick = () => {
        setChoice(false);
        setModalOn(false);
        setStudentNotApprovedBilkentCourse(null);
    };


    return (
        <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full   ">
            <div className="flex w-full h-full justify-center items-center ">
                <div className="flex-col justify-center bg-white py-12 px-24 border-4 border-sky-500 rounded-xl ">
                    <div
                        id="content"
                        class="border border-black bg-white/10 col-span-8 rounded-lg p-6"
                    >
                        <div className="flex">
                            <div id="title">
                                <h1 class="font-bold text-black text-2xl py-4">
                                   You Can Only Add 1 Course from Bilkent
                                </h1>
                            </div>
                        </div>
                        <Autocomplete
                            fullWidth
                            value={value}
                            onChange={(event, newValue) => {
                              setValue(newValue);
                            }}
                            disablePortal
                            id="combo-box-demo"
                            options={bilkentData2}
                            sx={{ width: 300 }}
                            renderInput={(params) => (
                                <TextField {...params} label="Select Bilkent Course" />
                            )}
                        />
                        {bilkentCourseChoice && (

                        <div id="container">
                            <div class="">
                                <div class="relative p-6 border border-black rounded-lg">
                                    <div className="text-black pb-4">
                                        Courses - Bilkent University
                                    </div>
                                    <div class="relative grid grid-rows gap-2">
                                        <form>
                                            <div class="mb-6">
                                                <TextField
                                                    fullWidth
                                                    id="outlined-read-only-input"
                                                    label="Bilkent Course Type"
                                                    // defaultValue="Hello World"
                                                    value={bilkentCourseChoice.type}
                                                    InputProps={{
                                                    readOnly: true,
                                                    }}
                                                />
                                            </div>
                                            <div class="mb-6">
                                                {/* <label
                                                    for="email"
                                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Course Name
                                                </label> */}
                                                <div class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >
                                                <TextField
                                                    fullWidth
                                                    id="outlined-read-only-input"
                                                    label="Course Code"
                                                    value={bilkentCourseChoice.bilkentCode}
                                                    InputProps={{
                                                    readOnly: true,
                                                    }}
                                                />

                                                </div>
                                            </div>
                                            <div class="mb-6">
                                                <TextField
                                                    fullWidth
                                                    id="outlined-read-only-input"
                                                    label="Course Name"
                                                    value={bilkentCourseChoice.name}
                                                    InputProps={{
                                                    readOnly: true,
                                                    }}
                                                />
                                            </div>
                                            <div class="mb-6">
                                                <TextField
                                                    fullWidth
                                                    id="outlined-read-only-input"
                                                    label="Bilkent Credit"
                                                    value={bilkentCourseChoice.credit}
                                                    InputProps={{
                                                    readOnly: true,
                                                    }}
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        ) 
                        }
                    </div>
                    <div className="flex justify-end ">
                        <div className="mr-3">
                            <button
                                onClick={handleCancelClick}
                                className="p-2 border border-black rounded-lg m-auto mt-6"
                            >
                                Cancel
                            </button>
                        </div>
                        {
                            bilkentCourseChoice != null ? 
                            <div>
                                <button
                                    onClick={handleOKClick}
                                    className="p-2 border border-black rounded-lg m-auto mt-6"
                                >
                                    Add This Bilkent Course
                                </button>
                            </div>
                            :
                            null
                        }  
                    </div>
                </div>
            </div>
        </div>

    );
}



