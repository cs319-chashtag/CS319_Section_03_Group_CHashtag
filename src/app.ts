// const express = require ("express")
// const bodyParser = require ("body-parser")
// const cors = require ("cors")
// const { Request, Response } = require ("express")

// const { AppDataSource } = require ("./data-source")
// const StudentRepo = require ("./repository/StudentRepo")
import * as express from "express"
import { Request, Response } from "express"
import { request } from "http"
import { AppDataSource } from "./database/data-source"
// const bodyParser = require('body-parser')
import  StudentRepo  from "./database/repository/StudentRepo"
import  LoginR from "./routers/Loginrouter"
import EmailM from "./routers/emailmanager"

AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

EmailM.sendLoginMail("hayrullah.tas@ug.bilkent.edu.tr", 21903488);
// create and setup express app
/* const app = express()
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(express.json())




// register routes

app.get("/login",LoginR.checkLogin);

app.get("/users", function (req: Request, res: Response) {


    // here we will have logic to return all users
})

app.get("/users/:id", async function (req: Request, res: Response) {
    const student = await StudentRepo.findStudentById(parseInt(req.params.id));
    console.log(student);
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
app.listen(3000, () => {
    console.log("Server started on port 3000!")
}); */