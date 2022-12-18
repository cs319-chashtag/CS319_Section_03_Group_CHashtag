import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

/* Done by @mr3mre 
 */
const ApprovedCourseData = [
  {
    bilkentCourse: {
      bilkentCode: "Math 260",
      name: "Intro to Computer Science",
      type: "Mandatory",
      credit: 4
    },
    hostCourses: [
      {
        hostCode: "CS 101",
        name: "Introduction to Computer Science",
        credit: 3
      },
      {
        hostCode: "CS 101",
        name: "Introduction to Computer Science",
        credit: 3
      },
      {
        hostCode: "CS 101",
        name: "Introduction to Computer Science",
        credit: 3
      },
      {
        hostCode: "CS 101",
        name: "Introduction to Computer Science",
        credit: 3
      },
      {
        hostCode: "CS 101",
        name: "Introduction to Computer Science",
        credit: 3
      }
    ]
  },
  {
    bilkentCourse: {
      bilkentCode: "Technical Elective",
      name: "Intro to Computer Science",
      type: "Mandatory",
      credit: 4
    },
    hostCourses: [
      {
        hostCode: "CS 202",
        name: "hI TEHER",
        credit: 3
      },
      {
        hostCode: "CS 101",
        name: "Introduction to Computer Science",
        credit: 3
      },
      {
        hostCode: "CS 101",
        name: "Introduction to Computer Science",
        credit: 3
      },
      {
        hostCode: "CS 101",
        name: "Introduction to Computer Science",
        credit: 3
      },
      {
        hostCode: "CS 101",
        name: "Introduction to Computer Science",
        credit: 3
      }
    ]
  }
];

function createRow(num, hostCode, name, credit, span, check, counter) {
  return { num, hostCode, name, credit, span, check, counter };
}

const rows = [];
var num = 1;
var check = true;
var counter = 0;
for (const approvedCourse of ApprovedCourseData) {
  const span = approvedCourse.hostCourses.length;
  for (const hostCourses of approvedCourse.hostCourses) {
    rows.push(
      createRow(
        num++,
        hostCourses.hostCode,
        hostCourses.name,
        hostCourses.credit,
        span,
        check,
        counter
      )
    );
    check = false;
  }
  counter++;
  check = true;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#ECEFF1"
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15
  }
}));

export default function StudentCourseTable() {
  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ width: "100%" }}>
        <Table
          sx={{ minWidth: 900, maxHeight: 800 }}
          stickyHeader
          aria-label="sticky table"
          size="small"
        >
          <TableHead>
            <TableRow hover="true">
              <StyledTableCell align="center" colSpan={4}>
                Host Courses
              </StyledTableCell>
              <StyledTableCell align="center" colSpan={3}>
                Bilkent Courses
              </StyledTableCell>
            </TableRow>
            <TableRow hover="true">
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>Course Code</StyledTableCell>
              <StyledTableCell style={{ minWidth: 220 }}>
                Course Name
              </StyledTableCell>
              <StyledTableCell>Course Credit</StyledTableCell>
              <StyledTableCell>
                Bilkent Course Code or Elective Type
              </StyledTableCell>
              <StyledTableCell style={{ minWidth: 150 }}>
                Bilkent Name If Any
              </StyledTableCell>
              <StyledTableCell>Bilkent Credit</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {allRows.map((rows) => //return */}
            {rows.map((row) => (
              <TableRow>
                <TableCell>{row.num}</TableCell>
                <TableCell>{row.hostCode}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.credit}</TableCell>
                {row.check ? (
                  <TableCell rowSpan={row.span}>
                    {ApprovedCourseData[row.counter].bilkentCourse.bilkentCode}
                  </TableCell>
                ) : null}
                {row.check ? (
                  <TableCell rowSpan={row.span}>
                    {ApprovedCourseData[row.counter].bilkentCourse.name}
                  </TableCell>
                ) : null}
                {row.check ? (
                  <TableCell rowSpan={row.span}>
                    {ApprovedCourseData[row.counter].bilkentCourse.credit}
                  </TableCell>
                ) : null}
              </TableRow>
            ))}
            {/* )} */}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
