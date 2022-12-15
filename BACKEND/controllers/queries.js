
class Query_abs{
    getStudInfo;
    getUserfromDb;
    addUser;
    addStudent;
    addCoordinator;
    updateStud;
    updateCoordinator; 
    updateUser;
    checkDbS; 

    constructor(){
    this.checkDbS = "SELECT * FROM users WHERE bilkentid = $1 AND email = $2";
    this.getStudInfo = "SELECT * FROM studinfo WHERE bilkentid = $1";
    this.getUserfromDb = "SELECT * FROM users WHERE bilkentid = $1 AND password = $2";
    this.addUser = "INSERT INTO users (name,status,surname,password,bilkentid,email) VALUES($1,$2,$3,$4,$5,$6)";
    this.addStudent = "INSERT INTO studinfo (bilkentid,department,student_school,exchange_type,minor,degree,major) VALUES($1,$2,$3,$4,$5,$6,$7)";
}
}
module.exports = Query_abs;
