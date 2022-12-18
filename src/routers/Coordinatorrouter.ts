import {Router} from "express";
import CoordinatorManager from "../controller/CoordinatorManager";


const router = Router();

class CoordinatorR {
    constructor(){
        router.get("/",CoordinatorManager.getCoorInfo);
        router.post("/profile/changepass",CoordinatorManager.changePassword);

}
}
new CoordinatorR();
export = router;