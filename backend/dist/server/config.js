"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverPort = exports.app = void 0;
const express = require("express");
const cors = require("cors");
const serverPort = 8000;
exports.serverPort = serverPort;
const app = express();
exports.app = app;
const whitelist = ["http://localhost:3000"];
let corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: "GET,PUT,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200,
};
app.options("*", cors(corsOptions));
app.all("*", cors(corsOptions), (req, res, next) => {
    next();
});
app.use(express.json());
