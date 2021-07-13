import {app} from "./server/routes"
import {serverPort} from "./server/config"

app.listen(serverPort, () => {
  console.log(`App is running on port ${serverPort}`);
});

/*
/ => this is working
/signin = POST success/fail
/register = POST = user
/profile/:userid = GET = user
/image = PUT = user
/detect
*/
