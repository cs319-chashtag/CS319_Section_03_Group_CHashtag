const pool = require("./db"); 
const Query_abs = require("./queries");
const crypt = require("crypto-js/sha1");


class logsigncontroller {
     querycontrol; 
    constructor(){
        this.querycontrol = new Query_abs();
        
    };
    async getUserfromDb (req,res) {
        if(req && req.body){
        
        const id = req.body.idField; 
        console.log(id);
        const password = req.body.passField;
        console.log(password);
        
       
        let results= await pool.query(this.querycontrol.getUserfromDb,[id,password])
            
            
        
            console.log(results.rows);
            if(results.rows.length == 0){
                res.send("user not found");
            }
            else {
            if(results.rows[0]['status'] == "Student")
            {   
                 req.session.logged = true;
                 req.session.bid = results.rows[0]['bilkentid'];
                 req.session.status = results.rows[0]['status'];
                 req.session.name = results.rows[0]['name'];
                 req.session.surname = results.rows[0]['surname'];
                 console.log("x");
                 res.json({
                    ss: 'asda',
                 });
                
    }
            else if (results.rows[0]['status'] == "Coordinator"){
                res.redirect("/w1");
            
            }
            else {
            res.send("User not found, try again"); 
            }
            
    }
}

}  
    
}

module.exports = logsigncontroller;

