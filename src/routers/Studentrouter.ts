import {Router} from "express";
import StudentManager from "../controller/StudentManager";
import { Student } from "../database/entity/UsersEntity/Student";

const router = Router();

class StudentR{
    constructor(){
        router.get("/",StudentManager.getStudentInfo);
        router.get("/profile/changepass",StudentManager.changePassword);
        router.post("/approval/create",StudentManager.createPreApproval);
       // router.post("/approval/edit"), StudentManager.updateApproval);
    }
}
new StudentR();

export=router;
/*
    create json template 
    than in the pre-approval stage fill the template and uplode the file 
    to the drive
    when request has been made
    get the file send it back to the front end, 
    
*/