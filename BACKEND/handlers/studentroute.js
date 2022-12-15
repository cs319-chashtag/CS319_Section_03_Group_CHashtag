
const { x64 } = require("crypto-js");
const {Router} = require("express"); 
const router = Router();
const Student = require("../controllers/students");

class StudentRoute{
    constructor(){
        this.studentController = new Student();
        router.get("/:param?",this.studentGet);
    };

    studentGet = async (req,res) => {
        if (await this.studentController.checkAuth(req,res)){
             if(!req.params.param){
                let res1 = await this.studentController.getStudInfo(req.session.bid);
                req.session.name = res1['name'];
                req.session.surname = res1['surname'];
                req.session.school = res1['student_school'];
                res.json(res1);
        }
            else res.send(" Fill the blanks");
    }
        else {
            console.log("nonon");
            res.json({
                error: 'User not found',
                redirecturl: '',
            });}
    }
}

new StudentRoute();

module.exports = router;