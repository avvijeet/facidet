"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const encryption_1 = require("../utils/encryption");
const db_1 = require("../utils/db");
const user_1 = require("../utils/user");
const config_1 = require("./config");
Object.defineProperty(exports, "app", { enumerable: true, get: function () { return config_1.app; } });
config_1.app.get("/", (req, res) => {
    res.json({ success: true, data: db_1.database.users });
});
config_1.app.get("/profile/:id", (req, res) => {
    const { id } = req.params;
    const userFound = user_1.findUser(id);
    if (userFound) {
        res.json({ success: true, data: userFound });
    }
    res.status(404).json({ success: false, message: "user not found" });
});
config_1.app.post("/signin", (req, res) => {
    const [shouldSignIn, userData] = encryption_1.checkUser(req.body);
    if (shouldSignIn) {
        res.json({
            success: true,
            message: "user signedin",
            data: { user: userData },
        });
    }
    else {
        res.status(401).send({ success: false, message: "signin failed" });
    }
});
config_1.app.post("/register", (req, res) => {
    const newUser = encryption_1.saveInfoInDb(req.body);
    res.status(201).json({
        success: true,
        message: "user registered",
        data: { user: newUser },
    });
});
config_1.app.put("/image", (req, res) => {
    const { id } = req.body;
    let found = false;
    let entries = 0;
    db_1.database.users.forEach((user) => {
        if (user.id === id) {
            found = true;
            user.entries++;
            entries = user.entries;
            return;
        }
    });
    if (found) {
        res.json({
            success: true,
            message: "entries updated",
            data: { entries: entries },
        });
    }
    else {
        res.status(404).send({ success: false, message: "user not found" });
    }
});
