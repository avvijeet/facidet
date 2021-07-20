const express = require("express");
const cors = require("cors");

const serverPort = 8000;

const app = express();

const whitelist = ["http://localhost:3000"];
let corsOptions = {
  origin: (origin: any, callback: any) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,PUT,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

app.options("*", cors(corsOptions));
app.all("*", cors(corsOptions), (req: any, res: any, next: () => void) => {
  next();
});

app.use(express.json());
// app.use(express.static(__dirname + "/public"))
// app.use((req, res, next) =>{
//     console.log("this is express middleware")
//     next()
// })

export { app, serverPort };
