"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = exports.findUser = void 0;
const db_1 = require("./db");
const findUser = (id) => {
    return db_1.database("users").where({ id: id });
};
exports.findUser = findUser;
const findUserByEmail = (email, db) => {
    return db_1.database(db).where({ email: email });
};
exports.findUserByEmail = findUserByEmail;
