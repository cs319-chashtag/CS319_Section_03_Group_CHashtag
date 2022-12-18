import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";

/* Done by @mr3mre 
 */
// const ApprovedCourseData = [
//   {
//     bilkentCourse: {
//       bilkentCode: "CS 201",
//       name: "Intro to Computer Science",
//       type: "Mandatory",
//       credit: 4
//     },
//     hostCourses: [
//       {
//         hostCode: "CS 105",
//         name: "Introduction to Computer Science",
//         credit: 3
//       },
//       {
//         hostCode: "CS 101",
//         name: "Introduction to Computer Science",
//         credit: 3
//       },
//       {
//         hostCode: "CS 102",
//         name: "Introduction to Computer Science",
//         credit: 3
//       },
//       {
//         hostCode: "CS 103",
//         name: "Introduction to Computer Science",
//         credit: 3
//       },
//       {
//         hostCode: "CS 104",
//         name: "Introduction to Computer Science",
//         credit: 3
//       }
//     ]
//   },
//   {
//     bilkentCourse: {
//       bilkentCode: "Technical Elective",
//       name: "Intro to Computer Science",
//       type: "Elective",
//       credit: 4
//     },
//     hostCourses: [
//       {
//         hostCode: "CS 202",
//         name: "Introduction to Computer Science",
//         credit: 3
//       },
//       {
//         hostCode: "CS 109",
//         name: "Introduction to Computer Science",
//         credit: 3
//       }
//     ]
//   },
//   {
//       bilkentCourse: {
//         bilkentCode: "General Elective",
//         name: "",
//         type: "Elective",
//         credit: 3
//       },
//       hostCourses: [
//         {
//           hostCode: "CS 205",
//           name: "Introduction to Computer Science",
//           credit: 3
//         },
//         {
//           hostCode: "CS 109",
//           name: "Introduction to Computer Science",
//           credit: 3
//         }
//       ]
//     }
// ];
const ApprovedCourseData = [
  // {
  //   bilkentCourse: {
  //     bilkentCode: "CS 201",
  //     name: "Intro to Computer Science",
  //     type: "Mandatory",
  //     credit: 4
  //   },
  //   hostCourses: [
  //     {
  //       hostCode: "CS 105",
  //       name: "Introduction to Computer Science",
  //       credit: 3
  //     },
  //     {
  //       hostCode: "CS 101",
  //       name: "Introduction to Computer Science",
  //       credit: 3
  //     },
  //     {
  //       hostCode: "CS 102",
  //       name: "Introduction to Computer Science",
  //       credit: 3
  //     },
  //     {
  //       hostCode: "CS 103",
  //       name: "Introduction to Computer Science",
  //       credit: 3
  //     },
  //     {
  //       hostCode: "CS 104",
  //       name: "Introduction to Computer Science",
  //       credit: 3
  //     }
  //   ]
  // },
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

function StudentTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            )
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
}

StudentTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

export default function StudentTable( { notApprovedCourseFinalArray, approvedCourseFinalArray }){
  const [artists, setRows] = React.useState([]);
  React.useEffect(() => {
    // console.log("ApprovedCourseData: ", ApprovedCourseData);

    if ( notApprovedCourseFinalArray.length != 0 ){
      console.log("notApprovedCourseFinalArray: ", notApprovedCourseFinalArray );
      ApprovedCourseData.push(notApprovedCourseFinalArray);
      // notApprovedCourseFinalArray = [];
      // approvedCourseFinalArray = [];
    }
    if ( approvedCourseFinalArray.length != 0  ){
      console.log("approvedCourseFinalArray: ", approvedCourseFinalArray );
      ApprovedCourseData.push(approvedCourseFinalArray);
      // notApprovedCourseFinalArray = [];
      // approvedCourseFinalArray = [];
    }

  }, [notApprovedCourseFinalArray, approvedCourseFinalArray]);



  function createRow(num, hostCode, name, credit, span, check, counter) {
    return { num, hostCode, name, credit, span, check, counter };
  }

  const rows = [];
  React.useEffect(() => {
    // console.log("ApprovedCourseData: ", ApprovedCourseData);
    var num = 1;
    var check = true;
    var counter = 0;
    for (const approvedCourse of ApprovedCourseData) {
      const span = approvedCourse.hostCourses.length;
      for (const hostCourses of approvedCourse.hostCourses) {
        setRows( // Replace the state
        [ // with a new array
          ...artists, // that contains all the old items
          createRow(
            num++,
            hostCourses.hostCode,
            hostCourses.name,
            hostCourses.credit,
            span,
            check,
            counter
          )// and one new item at the end
        ]);
        // rows.push(
        
        //   createRow(
        //     num++,
        //     hostCourses.hostCode,
        //     hostCourses.name,
        //     hostCourses.credit,
        //     span,
        //     check,
        //     counter
        //   )
        // );
        check = false;
      }
      counter++;
      check = true;
    }
    console.log("artists: ", artists);
  }, [ApprovedCourseData]);
  

  const [selected, setSelected] = React.useState([]);
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#ECEFF1"
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 15
    }
  }));

  // Avoid a layout jump when reaching the last page with empty rows.
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <StudentTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 900, maxHeight: 800 }}
            aria-label="sticky table"
            size="small"
          >
            <TableBody>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center" colSpan={4}>
                    Host Courses
                  </StyledTableCell>
                  <StyledTableCell align="center" colSpan={4}>
                    Bilkent Courses
                  </StyledTableCell>
                </TableRow>
                <TableRow>
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
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {artists.map((row, index) => {
                  const isItemSelected = isSelected(row.counter);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                    //   hover = "true"
                      onClick={(event) => handleClick(event, row.counter)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.num}
                      selected={isItemSelected}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.num}
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.hostCode}</TableCell>
                      <TableCell>{row.credit}</TableCell>
                      {row.check ? (
                        <TableCell rowSpan={row.span}>
                          {
                            artists[row.counter].bilkentCourse
                              .bilkentCode
                          }
                        </TableCell>
                      ) : null}
                      {row.check ? (
                        <TableCell rowSpan={row.span}>
                          {artists[row.counter].bilkentCourse.name}
                        </TableCell>
                      ) : null}
                      {row.check ? (
                        <TableCell rowSpan={row.span}>
                          {artists[row.counter].bilkentCourse.credit}
                        </TableCell>
                      ) : null}
                      {row.check ? (
                        <TableCell rowSpan={row.span} padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId
                            }}
                          />
                        </TableCell>
                      ) : null}
                    </TableRow>
                  );
                })}
              </TableBody>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
