"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = void 0;
const user_1 = require("../utils/user");
const profile = (req, res) => {
    const { id } = req.params;
    const userFound = user_1.findUser(id);
    userFound
        .then((user) => {
        if (user.length) {
            res.json({ success: true, data: user });
        }
        else {
            res.status(404).json({ success: false, message: "user not found" });
        }
    })
        .catch((err) => {
        res
            .status(400)
            .json({ success: false, message: "failed to fetch user profile" });
    });
};
exports.profile = profile;
