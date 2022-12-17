import  {Router} from "express";
import LoginManager from "../controller/LoginManager";
const router = Router();
class LoginR { 
    constructor(){
        router.post("/", LoginManager.checkLogin);
        router.get("/", (req,res)  =>  {
            res.send("ok");
        })
    };

}
new LoginR();

export = router;