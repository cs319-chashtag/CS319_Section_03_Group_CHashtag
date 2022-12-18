const Excel = require('exceljs');

const filename = "Selection.xlsx";
const sheet = "Placed";

var studentData = [];

const semesterFall = "Güz Dönemi";
const semesterSpring = "Bahar Dönemi";

var workbook = new Excel.Workbook(); 
try {
workbook.xlsx.readFile(filename)
    .then(function() {
        var worksheet = workbook.getWorksheet(sheet);
        worksheet.eachRow({ includeEmpty: false }, function(row, rowNumber) {
            if (rowNumber !== 1 ){
                if (row.values.length !== 8)
                    throw new Error("Row " + rowNumber + " has wrong number of columns");
                const rowValue = row.values;
                if (parseInt(rowValue[3]) == NaN)
                    throw new Error("ID is not a number");
                if (rowValue[5] != semesterFall && rowValue[5] != semesterSpring)
                    throw new Error("Semester is not valid");
                if ( rowValue[7].indexOf("@") == -1 && rowValue[7].indexOf("@") === 0){
                    throw new Error("This is not an email");
                }
                else {
                    const email = rowValue[7].split("@");
                    if (email[1] != "ug.bilkent.edu.tr")
                        throw new Error("This is not a Bilkent email");
                }
                studentData.push({
                    name: rowValue[1],
                    lastname: rowValue[2],
                    id: parseInt(rowValue[3]),
                    semester: rowValue[5] == semesterFall ? "fall" : "spring",
                    university: rowValue[6],
                    email: rowValue[7],
                });
            }
        });
        // console.log(studentData);
    }).then(function(){
            console.log(studentData);
        }
    );
} catch (error) {
    console.log(error);
}




