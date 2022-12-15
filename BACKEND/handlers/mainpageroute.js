const { Router } = require("express"); 

const router = Router();

class Main{
    constructor(){
        router.get("",this.directLogin);
    };

    directLogin =  (req,res) => {
        
            if(req.body){
            if(req.body.ty == "login"){
                res.redirect("/login");
            }
            res.send(""); }
            else {
                res.send("work");
            }
        };
        
    
}
new Main();
module.exports = router;