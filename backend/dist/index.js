"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = require("./server/routes");
const config_1 = require("./server/config");
routes_1.app.listen(config_1.serverPort, () => {
    console.log(`App is running on port ${config_1.serverPort}`);
});
/*
/ => this is working
/signin = POST success/fail
/register = POST = user
/profile/:userid = GET = user
/image = PUT = user
/detect
*/
