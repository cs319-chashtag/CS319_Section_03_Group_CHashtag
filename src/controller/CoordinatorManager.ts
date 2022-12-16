import  CoordinatorRepo  from "../database/repository/CoordinatorRepo";
import UserRepo from "../database/repository/UserRepo";
import { Request, Response } from "express";
import Auth from "./authenticate";


//Class which handles request that will come from student 
export default class CoordinatorManager {
    public static async getCoorInfo(req:Request,res:Response){
        if(Auth.checkAuth(req)){
            let result = await CoordinatorRepo.findCoordinatorById(req.session.bid).catch(err => res.send(err));
            if(result) { 
                res.send(result);
            }
            else{
                res.send("False");
            }
        }
        else{
            res.send("Login");
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
    
    
}
