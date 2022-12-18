import  StudentRepo  from "../database/repository/StudentRepo";
import  CoordinatorRepo  from "../database/repository/CoordinatorRepo";
import UserRepo from "../database/repository/UserRepo";
import { Request, Response } from "express";
import Auth from "./authenticate";
import { ApprovalStatus } from "../database/entity/ApprovalsEntity/PreApproval";
import EmailM from "./Emailmanager";
import { User } from "../database/entity/UsersEntity/User";

//Class which handles request that will come from student 
export default class StudentManager {
    public static async getStudentInfo(req: Request, res:Response){
    
    if(Auth.checkAuth(req)){
        let studentinfos =  await UserRepo.getUserById(req.session.bid).catch(err => console.log(err));
        let studentinfos2 = await StudentRepo.findStudentById(req.session.bid).catch(err => console.log(err));
        if(studentinfos == null) { 
            res.json({
                info: 'FALSE',
                studinfo: "null",

            })
        }

        else {
            res.json({
                info: ' TRUE',
                sutdinfo: studentinfos,
                studinfo1: studentinfos2,
                });
        }
        
    }

    else{
        res.send("login");
    }
    }
    //studentı id ile çek 
    public static async changePassword(req: Request, res:Response){
        if(Auth.checkAuth(req)){
        let result = await UserRepo.changePassword(req.session.bid,req.body.password).catch(err => res.send(err));
        if (result) res.send(result);
        else res.send("False");
    }
        else{
            res.send("Login");
        }
    }
    //true / false gönder
    public static async createPreApproval(req: Request, res: Response){
        if(Auth.checkAuth(req)){
        let result = await StudentRepo.createPreApproval(req.session.bid).catch(err => res.send(err));
        if(result) res.send(result);
        else res.send("False");}
        else {
            res.send("Login");
        }
    }
    /**
     * 
     * @param req 
     * @param res 
     * burayı apprvoal dönüşüne göre ayarla 
     * approvala coordinator öğesi ekle 
     */
    public static async sendApprovaltoCoor(req: Request, res: Response ){
       
        if(Auth.checkAuth(req)){
            let result = await UserRepo.getUserById(req.session.bid).catch(err => res.send(err));
            if(result instanceof User){
            let dep = result.department;
            let result1 = await CoordinatorRepo.findCoordinatorByDepartment(dep).catch(err=>res.send(err));
            let result2 = await StudentRepo.setPreApprovalStatus(req.session.bid, ApprovalStatus.COORDINATOR_PENDING);
            if(result2) {
                EmailM.approvalFormMail(result1['email']);
                res.send(result2);
            }
        }
            // burayı userdan çek böylece departmentını almış oluruz 
            
            else res.send("False");
        }
            else {
                res.send("Login");
            }
    }
    
    
    
}

