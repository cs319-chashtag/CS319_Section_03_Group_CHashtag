import  StudentRepo  from "../database/repository/StudentRepo";
import UserRepo from "../database/repository/UserRepo";
import { Request, Response } from "express";
import Auth from "./authenticate";
import EmailM from "./Emailmanager";
import { User } from "../database/entity/UsersEntity/User";

export default class InstructorManager{
    public static async getInstructorInfo(req: Request, res: Response){
        if(Auth.checkAuth(req)){
            let instinfos=  await UserRepo.getUserById(req.session.bid).catch(err => console.log(err));
            //let instinfos2 =  await CoordinatorRepo.findCoordinatorById(req.session.bid).catch(err => console.log(err));
            if(instinfos == null) { 
                res.json({
                    info: 'FALSE',
                    studinfo: "null",
    
                })
            }
    
            else {
                res.json({
                    info: ' TRUE',
                    instinfos: instinfos,
                    
                    });
            }
            
        }
    
        else{
            res.send("login");
        }
    }
}