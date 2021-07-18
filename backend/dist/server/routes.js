"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const encryption_1 = require("../utils/encryption");
const db_1 = require("../utils/db");
const user_1 = require("../utils/user");
const config_1 = require("./config");
Object.defineProperty(exports, "app", { enumerable: true, get: function () { return config_1.app; } });
config_1.app.get("/", (req, res) => {
    res.json({ success: true });
});
config_1.app.get("/profile/:id", (req, res) => {
    const { id } = req.params;
    const userFound = user_1.findUser(id);
    userFound.then(user => {
        if (user.length) {
            res.json({ success: true, data: user });
        }
        else {
            res.status(404).json({ success: false, message: "user not found" });
        }
    }).catch(err => {
        res.status(400).json({ success: false, message: "failed to fetch user profile" });
    });
});
config_1.app.post("/signin", (req, res) => {
    const { email, password } = req.body;
    db_1.database.select('email', 'hash')
        .from('login')
        .where({ email: email })
        .then(data => {
        if (encryption_1.compareHash(data[0].hash, password)) {
            user_1.findUserByEmail(email, 'users').then(user => {
                res.json({
                    success: true,
                    message: "user signedin",
                    data: { user: user[0] },
                });
            });
        }
        else {
            res.status(401).json({ success: false, message: "signin failed" });
        }
    })
        .catch(err => {
        res.status(400).json({ success: false, message: "oops something failed" });
    });
});
config_1.app.post("/register", (req, res) => {
    const { name, email, password } = req.body;
    db_1.database.transaction(trx => {
        trx.insert({
            hash: encryption_1.getHash(password),
            email: email,
        })
            .into('login')
            .returning('email')
            .then(async (loginEmail) => {
            const user = await trx('users')
                .returning('*')
                .insert({
                name: name,
                email: loginEmail[0],
                joined: new Date(),
            });
            res.status(201).json({
                success: true,
                message: "user registered",
                data: { user: user[0] },
            });
        }).then(trx.commit)
            .catch(trx.rollback);
    }).catch(err => {
        res.status(400).json({ success: false, error: "user registration failed" });
    });
});
config_1.app.put("/image", (req, res) => {
    const { id } = req.body;
    db_1.database('users')
        .where({ id: id })
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
        if (entries.length) {
            res.json({
                success: true,
                message: "entries updated",
                data: { entries: entries[0] },
            });
        }
        else {
            res.status(404).send({ success: false, message: "user not found" });
        }
    }).catch(err => {
        res.status(400).send({ success: false, error: "failed to update entries" });
    });
});
