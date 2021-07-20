import { getHash } from "../utils/encryption";
const register = (
  req: { body: { name: any; email: any; password: any } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: {
        (arg0: {
          success: boolean;
          message?: string;
          data?: { user: any };
          error?: string;
        }): void;
        new (): any;
      };
    };
  },
  database: { transaction: (arg0: (trx: any) => void) => Promise<any> }
) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ success: false, message: "one or more fields are missing" });
  }
  database
    .transaction((trx) => {
      trx
        .insert({
          hash: getHash(password),
          email: email,
        })
        .into("login")
        .returning("email")
        .then(async (loginEmail: any[]) => {
          const user = await trx("users").returning("*").insert({
            name: name,
            email: loginEmail[0],
            joined: new Date(),
          });
          res.status(201).json({
            success: true,
            message: "user registered",
            data: { user: user[0] },
          });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch((err) => {
      res
        .status(400)
        .json({ success: false, error: "user registration failed" });
    });
};

export { register };
