import { Knex } from "knex";
import { compareHash } from "../utils/encryption";
import { findUserByEmail } from "../utils/user";
const signIn = (
  req: { body: any },
  res: { json: any; status: any },
  database: Knex<any, unknown[]>
) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "one or more fields are missing" });
  }
  database
    .select("email", "hash")
    .from("login")
    .where({ email: email })
    .then((data) => {
      if (compareHash(data[0].hash, password)) {
        findUserByEmail(email, "users").then((user) => {
          res.json({
            success: true,
            message: "user signedin",
            data: { user: user[0] },
          });
        });
      } else {
        res.status(401).json({ success: false, message: "signin failed" });
      }
    })
    .catch((err) => {
      res
        .status(400)
        .json({ success: false, message: "oops something failed" });
    });
};

export { signIn };
