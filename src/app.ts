// const express = require ("express")
// const bodyParser = require ("body-parser")
// const cors = require ("cors")
// const { Request, Response } = require ("express")

// const { AppDataSource } = require ("./data-source")
// const StudentRepo = require ("./repository/StudentRepo")
import * as express from "express"
import { Request, Response } from "express"
import * as LogRoute from "./routers/LoginRouter";
import * as StudRoute from "./routers/Studentrouter";
import { request } from "http"
import { AppDataSource } from "./database/data-source"
// const bodyParser = require('body-parser')
import  StudentRepo  from "./database/repository/StudentRepo"
import EmailM from "./controller/Emailmanager"
import * as session from 'express-session';

AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

//mailM.sendLoginMail("hayrullah.tas@ug.bilkent.edu.tr", 21903488);
// create and setup express app
 const app = express()
//app.use(bodyParser.json({ type: 'application/*+json' }))
declare module "express-session" {
    interface SessionData {
      logged: boolean;
      bid: number;
      email: string;
      name: string;
      surname: string;
      status: string;
      
    }
  }
app.use(session({
    secret: 'Ax9**-131asdçç.123',
    resave: false,
    saveUninitialized: false,
}))
app.use(express.json())
app.use("/loginPage", LogRoute);
app.use("/studentPage",StudRoute);
// register routes





app.get("/users/:id", async function (req: Request, res: Response) {
    console.log("asd")
    const student = await StudentRepo.findStudentById(parseInt(req.params.id));
    
    res.send(student);
    // here we will have logic to return user by id
})

app.post("/users", function (req: Request, res: Response) {
    // here we will have logic to save a user
})

app.put("/users/:id", function (req: Request, res: Response) {
    // here we will have logic to update a user by a given user id
})

app.delete("/users/:id", function (req: Request, res: Response) {
    // here we will have logic to delete a user by a given user id
})

// start express server
app.listen(5000, () => {
    console.log("Server started on port 5000!")
}); 