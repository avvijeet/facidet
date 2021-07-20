"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const knex_1 = __importDefault(require("knex"));
const database = knex_1.default({
    client: "pg",
    connection: {
        host: "localhost",
        user: "root",
        password: "root",
        database: "facidet",
    },
});
exports.database = database;
