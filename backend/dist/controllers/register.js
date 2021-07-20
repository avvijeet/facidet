"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const encryption_1 = require("../utils/encryption");
const register = (req, res, database) => {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
        return res
            .status(400)
            .json({ success: false, message: "one or more fields are missing" });
    }
    database
        .transaction((trx) => {
        trx
            .insert({
            hash: encryption_1.getHash(password),
            email: email,
        })
            .into("login")
            .returning("email")
            .then(async (loginEmail) => {
            const user = await trx("users").returning("*").insert({
                name: name,
                email: loginEmail[0],
                joined: new Date(),
            });
            res.status(201).json({
                success: true,
                message: "user registered",
                data: { user: user[0] },
            });
        })
            .then(trx.commit)
            .catch(trx.rollback);
    })
        .catch((err) => {
        res
            .status(400)
            .json({ success: false, error: "user registration failed" });
    });
};
exports.register = register;
