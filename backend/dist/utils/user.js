"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = exports.findUser = void 0;
const db_1 = require("./db");
const findUser = (id) => {
    const users = db_1.database.users;
    let userFound = false;
    let i = 0;
    for (; i < users.length; i++) {
        if (users[i].id === Number(id)) {
            userFound = true;
            break;
        }
    }
    if (userFound) {
        return users[i];
    }
    return userFound;
};
exports.findUser = findUser;
const findUserByEmail = (email) => {
    const users = db_1.database.users;
    let userFound = false;
    let i = 0;
    for (; i < users.length; i++) {
        if (users[i].email === email) {
            userFound = true;
            break;
        }
    }
    if (userFound) {
        return users[i];
    }
    return userFound;
};
exports.findUserByEmail = findUserByEmail;
