"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clarifai = void 0;
const Clarifai = require("clarifai");
const clarifaiApp = new Clarifai.App({
    apiKey: "ac79631359d247559d7e2a9f0e8d8cbe",
});
const clarifai = (req, res) => {
    const { input } = req.body;
    console.log(input);
    clarifaiApp.models
        .predict(Clarifai.FACE_DETECT_MODEL, input)
        .then((response) => {
        return res.json({
            success: true,
            data: response,
        });
    })
        .catch((err) => {
        res.status(400).json({ success: false, message: "detection failed" });
    });
};
exports.clarifai = clarifai;
