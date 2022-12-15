//this class handeles database queries, and wanted results of the 
//queries, so in the studentroutes.js file only thing we have to do is, 
//put realted function in to the realted http requests. 

const pool = require("./db"); // to handle database access 
const Query_abs = require("./queries");// to abstract not rewrite queries over and over again 

class Students {
    query_control;
    constructor(){
        this.query_control = new Query_abs();
    };
    async getStudInfo(userid){
        let res = await pool.query(this.query_control.getStudInfo,[userid] );
        res = res.rows[0];
        let wanted_results = {
            bilkentid: res['bilkentid'],
            school: res['student_school'],
            department: res['department'],
            minor: res['minor'],
            major: res['major'],
            degree: res['degree'],
            exchange_type: res['exchange_type'],
        };
        return wanted_results;
    }

     async checkAuth (req,res) {
         // do();
            if(req.session.logged){
            const t = parseInt(req.params.id);
            if (req){
            return true;
            
            }
        }
            else{
                return false;
            }
     
}
}

module.exports = Students;


