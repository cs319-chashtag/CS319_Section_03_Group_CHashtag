import * as React from 'react';
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from '@mui/material/MenuItem';

/* Done by @mr3mre 
 */

export default function NotApprovedHostCourseSelection({ setModalOn, setChoice, setNotApprovedNumber, notApprovedNumber, setStudentNotApprovedHostCourse }){
    const [value, setValue] = useState("");
    const [hostCourseChoice, setHostCourseChoice] = useState(null);
   
    const [ hostCourseCode, setHostCourseCode ] = useState(null);
    const [ hostCourseName, setHostCourseName ] = useState(null);
    const [ hostCourseInfo, setHostCourseInfo] = useState(null);
    
    const [ checkButton, setCheckButton ] = useState(false);

    const defaultVal = 3;
    const [creditValue, setCreditValue] = useState(defaultVal);

  
    // const checkButton = hostCourseCode && hostCourseName && hostCourseInfo && !errorCourseName && !errorCourseCode && !errorCourseInfo;

    const creditNumbers = [
        {
            label: '0.5',
        },
        {
            label: '1',
        },
        {
            label: '1.5',
        },
        {
            label: '2',
        },
        {
            label: '2.5',
        },
        {
            label: '3',
        },
        {
            label: '3.5',
        },
        {
            label: '4',
        },
        {
            label: '4.5',
        },
        {
            label: '5.5',
        },
        {
            label: '6',
        }, 
        {
            label: '6.5',
        }, 
        {
            label: '7',
        }, 
        {
            label: '7.5',
        }, 
        {
            label: '8',
        }, 
        {
            label: '8.5',
        },
        {
            label: '9',
        },
        {
            label: '9.5',
        },
        {
            label: '10',
        }
      ];

    useEffect(() => {
        // console.log("hostCourseCode: ", hostCourseCode);
        // console.log( "hostCourseName: ", hostCourseName);
        // console.log("creditValue: ", creditValue);
        // console.log("hostCourseInfo: ", hostCourseInfo);

        setHostCourseChoice({
            hostCode: hostCourseCode,
            name: hostCourseName,
            credit: creditValue,
            info: hostCourseInfo
        });

        const errorCourseName = hostCourseName === "" || (hostCourseName != null && hostCourseName.length < 3);
        const errorCourseCode = hostCourseCode === "" || (hostCourseCode != null && hostCourseCode.length < 3);
        const errorCourseInfo = hostCourseInfo === "" || (hostCourseInfo != null && (hostCourseInfo.length < 20 || !hostCourseInfo.includes("http")));
    
        // console.log("checkButton: ", checkButton);
        setCheckButton(hostCourseCode && hostCourseName && hostCourseInfo && !errorCourseName && !errorCourseCode && !errorCourseInfo);

    }, [hostCourseName, hostCourseCode, hostCourseInfo, creditValue]);

    // console.log
    const handleOKClick = () => {
        setChoice(true);
        setModalOn(false);
        setNotApprovedNumber(notApprovedNumber + 1);
        setStudentNotApprovedHostCourse(hostCourseChoice);
        // console.log("hostCourseChoice: ", hostCourseChoice);
    };
    const handleCancelClick = () => {
        setChoice(false);
        setModalOn(false);
        setStudentNotApprovedHostCourse(null);
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
                                   You Can Add Up To 5 Course(s) from Host University
                                </h1>
                            </div>
                        </div>

                        <div id="container">
                            <div class="">
                                <div class="relative p-6 border border-black rounded-lg">
                                    <div className="text-black pb-4">
                                        Courses - Host University
                                    </div>
                                    <div class="relative grid grid-rows gap-2">
                                        <form>
                                            <div class="mb-6">
                                                <div class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >
                                                <TextField
                                                    fullWidth
                                                    required
                                                    id="outlined-required"
                                                    label="Host Course Code"
                                                    onChange={(e) => setHostCourseCode(e.target.value)}
                                                    inputProps={{ maxLength: 20 }}
                                                    error={ hostCourseCode === "" || (hostCourseCode != null && hostCourseCode.length < 3)}
                                                    helperText={ hostCourseCode === "" || (hostCourseCode != null && hostCourseCode.length < 3) ? 'Host Course Code must be at least 3 characters long' : ' '}
                                                />
                                                </div>
                                            </div>
                                            <div class="mb-6">
                                                <TextField
                                                    fullWidth
                                                    required
                                                    id="outlined-required"
                                                    label="Host Course Name"
                                                    onChange={(e) => setHostCourseName(e.target.value)}
                                                    inputProps={{ maxLength: 20 }}
                                                    error={hostCourseName === "" || (hostCourseName != null && hostCourseName.length < 3)}
                                                    helperText={hostCourseName === "" || (hostCourseName != null && hostCourseName.length < 3) ? 'Host Course Name must be at least 3 characters long' : ' '}
                                                />
                                            </div>
                                            <div class="mb-6">
                                                <TextField
                                                    fullWidth
                                                    required
                                                    id="outlined-select-currency"
                                                    select
                                                    defaultValue={defaultVal}
                                                    onChange={(e) => setCreditValue(e.target.value)}
                                                    // error={creditValue != 0 && !isNaN(creditValue)}
                                                    label="Select Host Course Credit"
                                                >
                                                {creditNumbers.map((option) => (
                                                    <MenuItem key={option.label} value={option.label}>
                                                    {option.label}
                                                    </MenuItem>
                                                ))}
                                                </TextField>
                                            </div>
                                            <div class="mb-6">
                                                <TextField
                                                    fullWidth
                                                    required
                                                    id="outlined-multiline-static"
                                                    label="Host Course Link and Syllabus Link Information"
                                                    multiline
                                                    rows={5}
                                                    placeholder="Please enter the course link and its related syllabus link."
                                                    inputProps={{ maxLength: 200 }}
                                                    onChange={(e) => setHostCourseInfo(e.target.value)}
                                                    error={hostCourseInfo === "" || (hostCourseInfo != null && (hostCourseInfo.length < 20 || !hostCourseInfo.includes("http")))}
                                                    helperText={hostCourseInfo === "" || (hostCourseInfo != null && hostCourseInfo.length < 20) ? (hostCourseInfo.includes("http")) ? 'Host Course Information must be at least 20 characters long' : 'Please include a course link' : ' '}
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                            checkButton ? 
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



