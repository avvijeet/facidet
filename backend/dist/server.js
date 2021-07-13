"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const encryption_1 = require("./utils/encryption");
const db_1 = require("./utils/db");
const user_1 = require("./utils/user");
const app = express();
const serverPort = 8000;
app.use(express.json());
// app.use(express.static(__dirname + "/public"))
// app.use((req, res, next) =>{
//     console.log("this is express middleware")
//     next()
// })
app.get("/", (req, res) => {
    res.json({ success: true, data: db_1.database.users });
});
app.get("/profile/:id", (req, res) => {
    const { id } = req.params;
    const userFound = user_1.findUser(id);
    if (userFound) {
        res.json({ success: true, data: userFound });
    }
    res.status(404).json({ success: false, message: "user not found" });
});
app.post("/signin", (req, res) => {
    const shouldSignIn = encryption_1.checkUser(req.body);
    if (shouldSignIn) {
        res.json({ success: true, message: "user signedin" });
    }
    else {
        res.status(401).send({ success: false, message: "signin failed" });
    }
});
app.post("/register", (req, res) => {
    const newUser = encryption_1.saveInfoInDb(req.body);
    res.status(201).json({
        success: true,
        message: "user registered",
        data: { user: newUser },
    });
});
app.put("/image", (req, res) => {
    const { id, image } = req.body;
    let found = false;
    db_1.database.users.forEach((user) => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return;
        }
    });
    if (found) {
        res.json({ success: true, message: "entries updated" });
    }
    res.status(404).send({ success: false, message: "user not found" });
});
app.listen(serverPort, () => {
    console.log(`App is running on port ${serverPort}`);
});
/*
/ => this is working
/signin = POST success/fail
/register = POST = user
/profile/:userid = GET = user
/image = PUT = user
/detect
*/
