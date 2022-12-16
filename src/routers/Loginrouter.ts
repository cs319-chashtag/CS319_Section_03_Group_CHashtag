import  {Router} from "express";
import LoginManager from "../controller/LoginManager";
const router = Router();
class LoginR { 
    constructor(){
        router.get("/", LoginManager.checkLogin);
    };

}
new LoginR();

export = router;