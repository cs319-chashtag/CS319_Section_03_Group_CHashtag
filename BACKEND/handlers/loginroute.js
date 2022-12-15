const {Router} = require("express"); 
const Logx = require("../controllers/logcontroller");
let control1 = new Logx();
const router = Router();
class LogRoute{
     constructor(){
          this.lcontroller = new Logx();
          router.post("/",loguser);
     }
     loguser = async (req,res) =>{
           await control1.getUserfromDb(req,res);
     }
  
     
}

new LogRoute();




module.exports = router;

