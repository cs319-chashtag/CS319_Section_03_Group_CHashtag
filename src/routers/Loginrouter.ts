import  UserRepo  from "../database/repository/UserRepo";

export default class LoginR {

    public static async checkLogin(req, res ){
        let userinfo = await UserRepo.checkUserLogin(req.body.idField,req.body.passField);
        if(userinfo == null){
            res.send("user not found");
        }
        else { 
            req.session.logged = true;
            req.session.bid = userinfo['id'];
            req.session.name = userinfo['name'];
            req.session.surname = userinfo['surname'];
            req.session.email = userinfo['email'];
            req.session.type = userinfo['type'];
            if(userinfo['type'] == "student"){
                res.json({
                    status: "Logged In",
                    type: req.session.type = userinfo['type'],
                })
            }
            else if (userinfo['type'] == "coordinator"){
                res.json({
                    status: "TRUE",
                    type: req.session.type = userinfo['type'],
                })
            }
            else if (userinfo['type'] == 'instructor'){
                res.json({
                    status: "TRUE",
                    type: req.session.type = userinfo['type'],
                })
            }
            else if(userinfo['type'] == 'fa'){
                res.json({
                    status: "TRUE",
                    type: req.session.type = userinfo['type'],
                })
            }
            else {
                res.json({
                    status: "ERROR",
                    
                })
            }

        }
    }
}