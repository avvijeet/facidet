"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUser = exports.saveInfoInDb = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("./db");
const user_1 = require("./user");
const saltRounds = 10;
const saveInfoInDb = (userInput) => {
    const { name, email, password } = userInput;
    //   bcrypt.hash(password, saltRounds, (err: any, hash: any) => {
    //     // Store hash in your password DB.
    //     if (err) {
    //       console.error(err);
    //     }
    //     const newUser = {
    //       id: 1236,
    //       name: name,
    //       email: email,
    //       password: hash,
    //       entries: 0,
    //       joined: new Date(),
    //     };
    //     database.users.push(newUser);
    //     return newUser;
    //   });
    const hash = bcrypt_1.default.hashSync(password, saltRounds);
    const newUser = {
        id: 1236,
        name: name,
        email: email,
        password: hash,
        entries: 0,
        joined: new Date(),
    };
    db_1.database.users.push(newUser);
    newUser.password = "";
    return newUser;
};
exports.saveInfoInDb = saveInfoInDb;
const checkUser = (userInput) => {
    //... fetch user from a db etc.
    const { email, password } = userInput;
    const user = user_1.findUserByEmail(email);
    if (user) {
        const res = [bcrypt_1.default.compareSync(password, user.password), user];
        // user.password = "";
        return res;
    }
    return [false, null];
};
exports.checkUser = checkUser;
