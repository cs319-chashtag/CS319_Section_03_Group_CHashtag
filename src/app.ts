// const express = require ("express")
// const bodyParser = require ("body-parser")
// const cors = require ("cors")
// const { Request, Response } = require ("express")

// const { AppDataSource } = require ("./data-source")
// const StudentRepo = require ("./repository/StudentRepo")
import * as express from "express"
import { Request, Response } from "express"
import { AppDataSource } from "./database/data-source"
import  StudentRepo  from "./database/repository/StudentRepo"

AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })


// create and setup express app
const app = express()
app.use(express.json())

// register routes

app.get("/", function (req: Request, res: Response) {
    console.log("Hello World!");

    // here we will have logic to return all users
})

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
});