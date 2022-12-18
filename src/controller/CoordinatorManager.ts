import  CoordinatorRepo  from "../database/repository/CoordinatorRepo";
import UserRepo from "../database/repository/UserRepo";
import { Request, Response } from "express";
import Auth from "./authenticate";
import { UserType } from "../database/entity/UsersEntity/User";


//Class which handles request that will come from student 
export default class CoordinatorManager {
    public static async getCoorInfo(req:Request,res:Response){
        if(Auth.checkAuth(req)){
            let coordinfos =  await UserRepo.getUserById(req.session.bid).catch(err => console.log(err));
            let coordinfos2 =  await CoordinatorRepo.findCoordinatorById(req.session.bid).catch(err => console.log(err));

            if(coordinfos == null) { 
                res.json({
                    info: 'FALSE',
                    studinfo: "null",
    
                })
            }
    
            else {
                res.json({
                    info: ' TRUE',
                    coorinfo: coordinfos,
                    coorinfo2: coordinfos2});
            }
            
        }
    
        else{
            res.send("login");
        }
        
    }

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

    public static async getApprovalForm(){
        
    }
    
    
}
