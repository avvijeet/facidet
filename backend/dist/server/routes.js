"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const db_1 = require("../utils/db");
const config_1 = require("./config");
Object.defineProperty(exports, "app", { enumerable: true, get: function () { return config_1.app; } });
const index_1 = require("../controllers/index");
config_1.app.get("/", (req, res) => {
    index_1.root(req, res);
});
config_1.app.get("/profile/:id", (req, res) => {
    index_1.profile(req, res);
});
config_1.app.post("/signin", (req, res) => {
    index_1.signIn(req, res, db_1.database);
});
config_1.app.post("/register", (req, res) => {
    index_1.register(req, res, db_1.database);
});
config_1.app.put("/image", (req, res) => {
    index_1.image(req, res, db_1.database);
});
config_1.app.post("/detect", (req, res) => {
    index_1.clarifai(req, res);
});
