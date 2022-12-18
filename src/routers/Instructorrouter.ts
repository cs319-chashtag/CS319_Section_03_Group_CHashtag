
import {Router} from "express";
import InstructorManager from "../controller/InstructorManager";


const router = Router();

class InstR{
    constructor(){
        router.get("/",InstructorManager.getInstructorInfo);
       // router.get("/approval",StudentManager.getApproval());
      
       // router.post("/approval/edit"), StudentManager.updateApproval);
    }
}
new InstR();

export=router;