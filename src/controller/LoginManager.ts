import  UserRepo  from "../database/repository/UserRepo";

export default class LoginManager {

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
            req.session.type = userinfo.userType;
            req.session.cookie.maxAge = 3600000;
            console.log(userinfo);
            if(userinfo.userType == "1"){
                res.json({
                    userinfo: "TRUE",
                    usertype: req.session.type,
                })
            }
            else if (userinfo.userType == "2"){
                res.json({
                    userinfo: "TRUE",
                    usertype: req.session.type,
                })
            }
            else if (userinfo['type'] == 'instructor'){
                res.json({
                    userinfo: "TRUE",
                    usertype: req.session.type,
                })
            }
            else if(userinfo['type'] == 'fa'){
                res.json({
                    userinfo: "TRUE",
                    usertype: req.session.type,
                })
            }
            else {
                res.json({
                    userinfo: "ERROR",
                    usertype: "can not find",
                    
                })
            }

        }
    }
}