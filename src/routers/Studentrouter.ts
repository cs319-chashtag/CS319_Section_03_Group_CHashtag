import  StudentRepo  from "../database/repository/StudentRepo";

export default class StudentR {
    public static async getStudentInfo(req, res){
    if(req.session.logged){
        let studentinfos =  await StudentRepo.findStudentById(req.session.bid).catch(err => console.log(err));
        if(studentinfos == null) { 
            res.json({
                status: 'no student found',

            })
        }

        else {
            res.send(studentinfos);
        }
        
    }

    else{
        res.send("login");
    }
    }

    public static async updateStudentInfo(req,res){
        if(req.sesssion.logged){
            
        }
    }

    
}