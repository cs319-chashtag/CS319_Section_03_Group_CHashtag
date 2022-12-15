const express = require("express");
const mainRoute = require("./handlers/mainpageroute");
const studentRoute = require("./handlers/studentroute.js"); 
const coordinatorRoute = require("./handlers/coordinatorroute");
const logRoute = require("./handlers/loginroute");
const bodyPar = require("body-parser");
const sess = require("express-session"); 
//const sess = reqiure("express-session");


const app = express();
const port = 3000; 
app.use(bodyPar.urlencoded({extended:false}));
app.use(bodyPar.json());
app.use(sess({
    secret: 'Ax9**-131asdçç.123',
    resave: false,
    saveUninitialized: false,
}));
//app.use(express.json());
//app.use("/",mainRoute);
app.use("",logRoute);
app.use("/w1",coordinatorRoute);
app.use("/w2",studentRoute);
app.listen(port, () => console.log("app started"));