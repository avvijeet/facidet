"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = void 0;
const encryption_1 = require("../utils/encryption");
const user_1 = require("../utils/user");
const signIn = (req, res, database) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(400)
            .json({ success: false, message: "one or more fields are missing" });
    }
    database
        .select("email", "hash")
        .from("login")
        .where({ email: email })
        .then((data) => {
        if (encryption_1.compareHash(data[0].hash, password)) {
            user_1.findUserByEmail(email, "users").then((user) => {
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
        .catch((err) => {
        res
            .status(400)
            .json({ success: false, message: "oops something failed" });
    });
};
exports.signIn = signIn;
