"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareHash = exports.getHash = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
const getHash = (password) => {
    return bcrypt_1.default.hashSync(password, saltRounds);
};
exports.getHash = getHash;
const compareHash = (hashFromDb, password) => {
    return bcrypt_1.default.compareSync(password, hashFromDb);
};
exports.compareHash = compareHash;
