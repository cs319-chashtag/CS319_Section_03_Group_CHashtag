const { HeadingLevel, Packer, Paragraph, Table, TableCell, TableRow, VerticalAlign, TextDirection, TextRun, AlignmentType, WidthType } = require("docx");
const docxReader = require("docx");
const fs = require("fs");

const studentData = {
    studentName : "Hayrullah Emre", 
    studentSurname: "Tas", 
    id: "21902296", 
    department : "Computer Engineering", 
    hostName : "Vrije Universiteit Amsterdam",
    year : "2022-2023", 
    semester: "Fall",
    coordinatorName : "Can Alkan",
}
const studentCourseData = [
    {
        hostCourseList : [
            {
                hostCourseCode : "X_400614",
                hostCourseName : "Data Structures and Algorithms",
                hostCredit : 6,
            },
            {
                hostCourseCode : "X_400614",
                hostCourseName : "Data Structures and Algorithms",
                hostCredit : 6,
            },
            {
                hostCourseCode : "X_400614",
                hostCourseName : "Data Structures and Algorithms",
                hostCredit : 6,
            },
            {
                hostCourseCode : "X_400614",
                hostCourseName : "Data Structures and Algorithms",
                hostCredit : 6,
            },
        ],
        bilkentCode : "CS473 - Algorithms I",
        bilkentCredit : 3,
        bilkentElective : "",
    },
    {
        hostCourseList : [
            {
                hostCourseCode : "L_GCBAALG003",
                hostCourseName : "Imagining the Dutch: themes in Dutch History",
                hostCredit : 6,
            },
            {
                hostCourseCode : "X_400614",
                hostCourseName : "Data Structures and Algorithms",
                hostCredit : 6,
            },
            {
                hostCourseCode : "L_GCBAALG003",
                hostCourseName : "Imagining the Dutch: themes in Dutch History",
                hostCredit : 6,
            },
        ],
        bilkentCode : "Arts Core Elective",
        bilkentCredit : 3,
        bilkentElective : "",
    },
    {
        hostCourseList : [
            {
                hostCourseCode : "X_400614",
                hostCourseName : "Data Structures and Algorithms",
                hostCredit : 3,
            },
        ],
        bilkentCode : "CS473 - Algorithms I",
        bilkentCredit : 3,
        bilkentElective : "",
    },
    {
        hostCourseList : [
            {
                hostCourseCode : "L_AABAALG056",
                hostCourseName : "Amsterdam: A Historical Introduction",
                hostCredit : 5,
            },
        ],
        
        bilkentCode : "General Elective",
        bilkentCredit : 3,
        bilkentElective : "",
    },
    {
        hostCourseList : [
            {
                hostCourseCode : "X_4006134",
                hostCourseName : "Data and Algorithms",
                hostCredit : 2,
            },
            {
                hostCourseCode : "X_401020",
                hostCourseName : "Statistical Methods",
                hostCredit : 1,
            },
            {
                hostCourseCode : "X_401020",
                hostCourseName : "Statistical Methods",
                hostCredit : 2,
            },
        ],
        bilkentCode : "Technical Elective",
        bilkentCredit : 3,
        bilkentElective : "MATH 260",
    },
    {
        hostCourseList : [
            {
                hostCourseCode : "X_400614",
                hostCourseName : "Data Structures and Algorithms",
                hostCredit : 6,
            },
        ],
        bilkentCode : "CS473 - Algorithms I",
        bilkentCredit : 3,
        bilkentElective : "",
    },
];

// Document Styles
const tableSize = 11000;
const cellSizeFirstTable = 2000;
const tableMargin = {
    top: 100,
    bottom: 100,
    left: 100,
    right: 100,
};
const styleHeader = {
    paragraphStyles: [
        {
            id: "std",
            name: "Standard",
            basedOn: "Normal",
            next: "Normal",
            run: {
                size : 18,
                font: "Arial",
            },
        },
        {
            id: "stdFontBig",
            name: "Big",
            basedOn: "Normal",
            next: "Normal",
            run: {
                bold: true,
                size : 32,
                font: "Arial",
            },
        },
        {
            id: "stdFontSmall",
            name: "Small",
            basedOn: "Normal",
            next: "Normal",
            run: {
                size : 16,
                font: "Arial",
            },

            paragraph: {
                spacing: {
                    after: 100,
                    before: 100,
                },
            },
        },
    ],
    default: {
        heading1: {
            run: {
                size: 32,
                bold: true,
                color: "000000",
            },
            paragraph: {
                spacing: {
                    after: 120,
                },
            },
        },
        heading6: {
            run: {
                size: 16,
                bold: false,
                color: "000000",
            },
            paragraph: {
                spacing: {
                    after: 120,
                },
            },

        }
    },
}

// Data Generation
var count = 1;
const generateTable = (data) => data.map(
    ({ bilkentCode, bilkentCredit, bilkentElective, hostCourseList }) =>
        new Table({
            width: {
                size: tableSize,
                type: WidthType.DXA,
            },
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            margins: tableMargin,
                            width : {
                                size: 500,
                                type: WidthType.DXA,
                            },
                            children: [new Paragraph({
                                style : "std",
                                text : (count++).toString(),
                            })],
                            verticalAlign: VerticalAlign.CENTER,
                            textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                        }),
                        new TableCell({
                                    margins: tableMargin,
                                    children: [new Paragraph({
                                        style : "std",
                                        text : hostCourseList[0].hostCourseCode,
                                    })],
                                    verticalAlign: VerticalAlign.CENTER,
                                    textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                        }),
                        new TableCell({
                            margins: tableMargin,
                            children: [new Paragraph({
                                style : "std",
                                text : hostCourseList[0].hostCourseName,
                            })],
                            verticalAlign: VerticalAlign.CENTER,
                            textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                        }),
                        new TableCell({
                            margins: tableMargin,
                            children: [new Paragraph({
                                style : "std",
                                text : hostCourseList[0].hostCredit.toString(),
                            })],
                            verticalAlign: VerticalAlign.CENTER,
                            textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                        }),
                        new TableCell({
                            margins: tableMargin,
                            children: [new Paragraph({
                                style : "std",
                                text : "",
                            })],
                            verticalAlign: VerticalAlign.CENTER,
                            textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                        }),
                        new TableCell({
                            margins: tableMargin,
                            rowSpan : hostCourseList.length,
                            children: [new Paragraph({
                                style : "std",
                                text : bilkentCode,
                            })],
                            verticalAlign: VerticalAlign.CENTER,
                            textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                        }),
                        new TableCell({
                            margins: tableMargin,
                            rowSpan : hostCourseList.length,
                            children: [new Paragraph({
                                style : "std",
                                text : bilkentCredit.toString(),
                            })],
                            verticalAlign: VerticalAlign.CENTER,
                            textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                        }),
                        new TableCell({
                            margins: tableMargin,
                            rowSpan : hostCourseList.length,
                            children: [new Paragraph({
                                style : "std",
                                text : bilkentElective,
                            })],
                            verticalAlign: VerticalAlign.CENTER,
                            textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                        }),
                        
                    ],
                }),
                ...generateRows(hostCourseList),
            ],
        })
);
const generateRows = (data) => data.filter(
    function (element) {
        // console.log( "ELEMENT: ", data );
        if ( data.length > 1 && element != data[0]){
            return element;
        }
    }
).map(function(element){
    return new TableRow({
        children: [
            new TableCell({
                margins: tableMargin,
                width : {
                    size: 500,
                    type: WidthType.DXA,
                },
                children: [new Paragraph({
                    style : "std",
                    text : (count++).toString(),
                })],
                verticalAlign: VerticalAlign.CENTER,
                textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
            }),
            new TableCell({
                margins: tableMargin,
                children: [new Paragraph({
                    style : "std",
                    text : element.hostCourseCode,
                })],
                verticalAlign: VerticalAlign.CENTER,
                textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
            }),
            new TableCell({
                margins: tableMargin,
                children: [new Paragraph({
                    style : "std",
                    text : element.hostCourseName,
                })],
                verticalAlign: VerticalAlign.CENTER,
                textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
            }),
            new TableCell({
                margins: tableMargin,
                children: [new Paragraph({
                    style : "std",
                    text : element.hostCredit.toString(),
                })],
                verticalAlign: VerticalAlign.CENTER,
                textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
            }),
            new TableCell({
                margins: tableMargin,
                children: [new Paragraph({
                    style : "std",
                    text : "",
                })],
                verticalAlign: VerticalAlign.CENTER,
                textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
            }),
        ],
    });
}
);

// Create a new document
const doc = new docxReader.Document({
    styles : styleHeader,
    sections: [
        {   
            properties: {
                page: {
                    margin: {
                        top: 600,
                        right: 400,
                        bottom: 600,
                        left: 400,
                    },
                },
            },
            children: [
                new Paragraph({
                    text : "Bilkent University Course Transfer and Exemption Form for Undergraduate Students",
                    heading: HeadingLevel.HEADING_1,
                    style: "stdFontBig",
                    alignment: AlignmentType.CENTER,
                }),
                new Paragraph(""),
                new Table({
                    width: {
                        size: tableSize,
                        type: WidthType.DXA,
                    },
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    margins: tableMargin,
                                    children: [new Paragraph({
                                        style: "std",
                                        children: [
                                            new TextRun({
                                                text: "Name",
                                                bold: true,
                                            }),
                                        ],
                                    })],
                                    verticalAlign: VerticalAlign.CENTER,
                                    textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                                }),
                                new TableCell({
                                    
                                    margins: tableMargin,
                                    width : {
                                        size: cellSizeFirstTable,
                                        type: WidthType.AUTO,
                                    },
                                    children: [new Paragraph({
                                        text : studentData.studentName,
                                        style: "std",
                                    })],
                                    textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                                }),
                                new TableCell({
                                    margins: tableMargin,
                                    children: [new Paragraph({
                                        style: "std",
                                        children: [
                                            new TextRun({
                                                text: "ID Number",
                                                bold: true,
                                            }),
                                        ],
                                    })],
                                    verticalAlign: VerticalAlign.CENTER,
                                    textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                                }),
                                new TableCell({
                                    margins: tableMargin,
                                    width : {
                                        size: cellSizeFirstTable,
                                        type: WidthType.AUTO,
                                    },
                                    children: [new Paragraph({
                                        text : studentData.id,
                                        style: "std",
                                    })],
                                    verticalAlign: VerticalAlign.CENTER,
                                    textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                                }),
                                
                            ],
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    margins: tableMargin,
                                    children: [new Paragraph({
                                        style: "std",
                                        children: [
                                            new TextRun({
                                                text: "Surname",
                                                bold: true,
                                            }),
                                        ],
                                    })],
                                    verticalAlign: VerticalAlign.CENTER,
                                    textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                                }),
                                new TableCell({
                                    margins: tableMargin,
                                    width : {
                                        size: cellSizeFirstTable,
                                        type: WidthType.AUTO,
                                    },
                                    children: [new Paragraph({
                                        text : studentData.studentSurname,
                                        style: "std",
                                    })],
                                    verticalAlign: VerticalAlign.CENTER,
                                    textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                                }),
                                new TableCell({
                                    margins: tableMargin,
                                    children: [new Paragraph({
                                        style: "std",
                                        children: [
                                            new TextRun({
                                                text: "Department",
                                                bold: true,
                                            }),
                                        ],
                                    })],
                                    verticalAlign: VerticalAlign.CENTER,
                                    textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                                }),
                                new TableCell({
                                    margins: tableMargin,
                                    width : {
                                        size: cellSizeFirstTable,
                                        type: WidthType.AUTO,
                                    },
                                    children: [new Paragraph({
                                        text : studentData.department,
                                        style: "std",
                                    })],
                                    verticalAlign: VerticalAlign.CENTER,
                                    textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                                }),
                            ],
                        }),
                
                    ],
                }),
                new Paragraph(""),
                new Table({
                    width: {
                        size: tableSize,
                        type: WidthType.DXA,
                    },
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    margins: tableMargin,
                                    children: [new Paragraph({
                                        style: "std",
                                        children: [
                                            new TextRun({
                                                text: "Name of the host institution",
                                                bold: true,
                                            }),
                                        ],
                                    })],
                                    verticalAlign: VerticalAlign.LEFT,
                                    // verticalAlign: VerticalAlign.CENTER,
                                    textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                                    rowSpan: 2,
                                }),
                                new TableCell({
                                    margins: tableMargin,
                                    width : {
                                        size: cellSizeFirstTable,
                                        type: WidthType.AUTO,
                                    },
                                    children: [new Paragraph({
                                        text : studentData.hostName,
                                        style: "std",
                                    })],
                                    verticalAlign: VerticalAlign.LEFT,
                                    // verticalAlign: VerticalAlign.CENTER,
                                    textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                                    rowSpan: 2,
                                }),
                                new TableCell({
                                    margins: tableMargin,
                                    children: [new Paragraph({
                                        style: "std",
                                        children: [
                                            new TextRun({
                                                text: "Academic Year",
                                                bold: true,
                                            }),
                                        ],
                                    })],
                                    verticalAlign: VerticalAlign.CENTER,
                                    textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                                }),
                                new TableCell({
                                    margins: tableMargin,
                                    width : {
                                        size: cellSizeFirstTable,
                                        type: WidthType.AUTO,
                                    },
                                    children: [new Paragraph({
                                        text : studentData.year,
                                        style: "std",
                                    })],
                                    verticalAlign: VerticalAlign.CENTER,
                                    textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                                }), 
                            ],
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    margins: tableMargin,
                                    children: [new Paragraph({
                                        style: "std",
                                        children: [
                                            new TextRun({
                                                text: "Semester",
                                                bold: true,
                                            }),
                                        ],
                                    })],
                                    verticalAlign: VerticalAlign.CENTER,
                                    textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                                }),
                                new TableCell({
                                    margins: tableMargin,
                                    width : {
                                        size: cellSizeFirstTable,
                                        type: WidthType.AUTO,
                                    },
                                    children: [new Paragraph({
                                        text : studentData.semester,
                                        style: "std",
                                    })],
                                    verticalAlign: VerticalAlign.CENTER,
                                    textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                                }),
                            
                            ],
                        }),          
                    ],
                }),
                new Paragraph(""),
                new Table({
                    width: {
                        size: tableSize,
                        type: WidthType.DXA,
                    },
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    margins: tableMargin,
                                    children: [new Paragraph({
                                        style: "std",
                                        children: [
                                            new TextRun({
                                                text: "Transferred Courses",
                                                bold: true,
                                            }),
                                        ],
                                    })],
                                    verticalAlign: VerticalAlign.CENTER,
                                    textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                                    columnSpan: 5,
                                }),
                                new TableCell({
                                    margins: tableMargin,
                                    children: [new Paragraph({
                                        style: "std",
                                        children: [
                                            new TextRun({
                                                text: "Course or requirement to be exempted if transferred course is completed with a passing grade †",
                                                bold: true,
                                            }),
                                        ],
                                    })],
                                    verticalAlign: VerticalAlign.CENTER,
                                    textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                                    columnSpan: 3,
                                }),
                            ],
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    margins: tableMargin,
                                    children: [new Paragraph("")],
                                    verticalAlign: VerticalAlign.CENTER,
                                    textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                                }),
                                new TableCell({
                                    margins: tableMargin,
                                    children: [new Paragraph({
                                        style: "std",
                                        children: [
                                            new TextRun({
                                                text: "Course Code",
                                                bold: true,
                                            }),
                                        ],
                                    })],
                                    verticalAlign: VerticalAlign.CENTER,
                                    textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                                }),
                                new TableCell({
                                    margins: tableMargin,
                                    children: [new Paragraph({
                                        style: "std",
                                        children: [
                                            new TextRun({
                                                text: "Course Name",
                                                bold: true,
                                            }),
                                        ],
                                    })],
                                    verticalAlign: VerticalAlign.CENTER,
                                    textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                                }),
                                new TableCell({
                                    margins: tableMargin,
                                    children: [new Paragraph({
                                        style: "std",
                                        children: [
                                            new TextRun({
                                                text: "Credits*",
                                                bold: true,
                                            }),
                                        ],
                                    })],
                                    verticalAlign: VerticalAlign.CENTER,
                                    textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                                }),
                                new TableCell({
                                    margins: tableMargin,
                                    children: [new Paragraph({
                                        style: "std",
                                        children: [
                                            new TextRun({
                                                text: "Grade**",
                                                bold: true,
                                            }),
                                        ],
                                    })],
                                    verticalAlign: VerticalAlign.CENTER,
                                    textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                                }),
                                new TableCell({
                                    margins: tableMargin,
                                    children: [new Paragraph({
                                        style: "std",
                                        children: [
                                            new TextRun({
                                                text: "Course Code and Name for a Required Course Elective Group Name for an Elective Requirement",
                                                bold: true,
                                            }),
                                        ],
                                    })],
                                    verticalAlign: VerticalAlign.CENTER,
                                    textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                                }),
                                new TableCell({
                                    margins: tableMargin,
                                    children: [new Paragraph({
                                        style: "std",
                                        children: [
                                            new TextRun({
                                                text: "Credits",
                                                bold: true,
                                            }),
                                        ],
                                    })],
                                    verticalAlign: VerticalAlign.CENTER,
                                    textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                                }),
                                new TableCell({
                                    margins: tableMargin,
                                    children: [new Paragraph({
                                        style: "std",
                                        children: [
                                            new TextRun({
                                                text: "Elective Requirement Exemptions only: Course code(s) of directly equivalent course(s), if any ***",
                                                bold: true,
                                            }),
                                        ],
                                    })],
                                    verticalAlign: VerticalAlign.CENTER,
                                    textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                                })
                            ],
                        }),
                        // ...generateRows(Data),
                        

                        // ...generateRowsTest3(Data),
                        // ...generateRowsTest2(Data),
                        // ...generateRowsTest(Data),
                        // ...generateTable3(Data)
                    ],
                }),
                ...generateTable(studentCourseData),
                new Paragraph(""),
                new Table({
                    width: {
                        size: tableSize,
                        type: WidthType.DXA,
                    },
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    margins: tableMargin,
                                    children: [new Paragraph({
                                        style: "std",
                                        children: [
                                            new TextRun({
                                                text: "Approved by",
                                                bold: true,
                                            }),
                                        ],
                                    })],
                                    verticalAlign: VerticalAlign.CENTER,
                                    textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                                }),
                                new TableCell({
                                    margins: tableMargin,
                                    children: [new Paragraph({
                                        style: "std",
                                        children: [
                                            new TextRun({
                                                text: "Name",
                                                bold: true,
                                            }),
                                        ],
                                    })],
                                    verticalAlign: VerticalAlign.CENTER,
                                    textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                                }),
                                new TableCell({
                                    margins: tableMargin,
                                    children: [new Paragraph({
                                        style: "std",
                                        children: [
                                            new TextRun({
                                                text: "Signature",
                                                bold: true,
                                            }),
                                        ],
                                    })],
                                    verticalAlign: VerticalAlign.CENTER,
                                    textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                                }),
                                new TableCell({
                                    margins: tableMargin,
                                    children: [new Paragraph({
                                        style: "std",
                                        children: [
                                            new TextRun({
                                                text: "Date",
                                                bold: true,
                                            }),
                                        ],
                                    })],
                                    verticalAlign: VerticalAlign.CENTER,
                                    textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                                }),
                            ],
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    margins: tableMargin,
                                    children: [new Paragraph({
                                        style: "std",
                                        text : "Exchange Coordinator",
                                    })],
                                    verticalAlign: VerticalAlign.CENTER,
                                    textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                                }),
                                new TableCell({
                                    margins: tableMargin,
                                    children: [new Paragraph({
                                        style: "std",
                                        text : studentData.coordinatorName,
                                    })],
                                    verticalAlign: VerticalAlign.CENTER,
                                    textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                                }),
                                new TableCell({
                                    margins: tableMargin,
                                    children: [new Paragraph({
                                        style: "std",
                                        text : "",
                                    })],
                                    verticalAlign: VerticalAlign.CENTER,
                                    textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                                }),
                                new TableCell({
                                    margins: tableMargin,
                                    children: [new Paragraph({
                                        style: "std",
                                        text : ((new Date().getDate()) + "." + (new Date().getUTCMonth() + 1) + "." + new Date().getUTCFullYear()),
                                    })],
                                    verticalAlign: VerticalAlign.CENTER,
                                    textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                                }),
                            ],
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    margins: tableMargin,
                                    children: [new Paragraph({
                                        style: "std",
                                        text : "Chair",
                                    })],
                                    verticalAlign: VerticalAlign.CENTER,
                                    textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                                }),
                                new TableCell({
                                    margins: tableMargin,
                                    children: [new Paragraph({
                                        style: "std",
                                        text : "",
                                    })],
                                    verticalAlign: VerticalAlign.CENTER,
                                    textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                                }),
                                new TableCell({
                                    margins: tableMargin,
                                    children: [new Paragraph({
                                        style: "std",
                                        text : "",
                                    })],
                                    verticalAlign: VerticalAlign.CENTER,
                                    textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                                }),
                                new TableCell({
                                    margins: tableMargin,
                                    children: [new Paragraph({
                                        style: "std",
                                        text : ((new Date().getDate()) + "." + (new Date().getUTCMonth() + 1) + "." + new Date().getUTCFullYear()),
                                    })],
                                    verticalAlign: VerticalAlign.CENTER,
                                    textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                                }),
                            ],
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    margins: tableMargin,
                                    children: [new Paragraph({
                                        style: "std",
                                        text : "Dean / Director",
                                    })],
                                    verticalAlign: VerticalAlign.CENTER,
                                    textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                                }),
                                new TableCell({
                                    margins: tableMargin,
                                    children: [new Paragraph({
                                        style: "std",
                                        text : "",
                                    })],
                                    verticalAlign: VerticalAlign.CENTER,
                                    textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                                }),
                                new TableCell({
                                    margins: tableMargin,
                                    children: [new Paragraph({
                                        style: "std",
                                        text : "",
                                    })],
                                    verticalAlign: VerticalAlign.CENTER,
                                    textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                                }),
                                new TableCell({
                                    margins: tableMargin,
                                    children: [new Paragraph({
                                        style: "std",
                                        text : ((new Date().getDate()) + "." + (new Date().getUTCMonth() + 1) + "." + new Date().getUTCFullYear()),
                                    })],
                                    verticalAlign: VerticalAlign.CENTER,
                                    textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
                                }),
                            ],
                        }),
                
                    ],
                }),
                new Paragraph({
                    text : "* ECTS credits for Erasmus exchange students.",
                    style : "stdFontSmall",
                }),
                new Paragraph({
                    text : "** For exchange students, please refer to the partner institution grading system information provided by the Office of International Students and Exchange Programs",
                    style : "stdFontSmall",
                }),
                new Paragraph({
                    text : "*** Applicable only if there is a directly equivalent course in the elective group that the student is exempted from. The student will be considered to have taken this course by the STARS system.",
                    style : "stdFontSmall",
                }),
                new Paragraph({
                    text : "† A transferred course may provide exemption from a requirement in the curriculum if deemed to be equivalent by the Faculty/School Executive Board. It is possible for one transferred course to provide exemption from one or more curriculum courses or vice versa.",
                    style : "stdFontSmall",
                })
            ],
        },
    ],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("cte-"+ studentData.id + ".docx", buffer);
});