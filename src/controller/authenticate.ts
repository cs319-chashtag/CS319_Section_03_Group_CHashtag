import { Request, Response } from "express";

export default class Auth {

    public static async checkAuth(req: Request){
        if(req.session.logged){
            return true;
        }
        else return false; 
    }

}