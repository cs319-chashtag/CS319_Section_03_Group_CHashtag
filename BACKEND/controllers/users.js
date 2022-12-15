const Query_abs = require("./queries");// to abstract not rewrite queries over and over again 
const pool = require("./db"); // to handle database access 

class Users {
    query_control;
    constructor(){
        this.query_control = new Query_abs();
    }

    async getUserFromDb (id,password) { 
        let res = await pool.query(this.query_control.getUserFromDb,[id,password]).rows[0];
        if(res){
            return res['status'];
        }
        else{
            return "Wrond ID or Password";
        }
    }

    async addUserTotheDb (id,password,status,email){

    }
}