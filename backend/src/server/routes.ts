import { getHash, compareHash } from "../utils/encryption";
import { database } from "../utils/db";
import { findUser, findUserByEmail } from "../utils/user";
import { app } from "./config";

app.get(
  "/",
  (
    req: any,
    res: {
      json: (arg0: {
        success: boolean;
      }) => void;
    }
  ) => {
    res.json({ success: true });
  }
);

app.get(
  "/profile/:id",
  (
    req: { params: { id: any } },
    res: { json: (arg0: { success: boolean; data: any[]; }) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; message: string; }): void; new(): any; }; }; }
  ) => {
    const { id } = req.params;
    const userFound = findUser(id);
    userFound.then(user => {
      if (user.length) {
        res.json({ success: true, data: user });
      } else { res.status(404).json({ success: false, message: "user not found" }); }
    }).catch(err => {
      res.status(400).json({ success: false, message: "failed to fetch user profile" });
    })
  }
);

app.post(
  "/signin",
  (
    req: { body: { email: string; password: string } },
    res: { json: (arg0: { success: boolean; message: string; data: { user: any; }; }) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; message: string; }): void; new(): any; }; }; }
  ) => {
    const { email, password } = req.body
    database.select('email', 'hash')
      .from('login')
      .where({ email: email })
      .then(data => {
        if (compareHash(data[0].hash, password)) {
          findUserByEmail(email, 'users').then(user => {
            res.json({
              success: true,
              message: "user signedin",
              data: { user: user[0] },
            });
          })
        }
        else {
          res.status(401).json({ success: false, message: "signin failed" })
        }
      })
      .catch(err => {
        res.status(400).json({ success: false, message: "oops something failed" })
      })
  }
);

app.post(
  "/register",
  (
    req: { body: any },
    res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; message?: string; data?: { user: any; }; error?: string; }): void; new(): any; }; }; }
  ) => {
    const { name, email, password } = req.body;
    database.transaction(trx => {
      trx.insert({
        hash: getHash(password),
        email: email,
      })
        .into('login')
        .returning('email')
        .then(async loginEmail => {
          const user = await trx('users')
            .returning('*')
            .insert({
              name: name,
              email: loginEmail[0],
              joined: new Date(),
            });
          res.status(201).json({
            success: true,
            message: "user registered",
            data: { user: user[0] },
          });
        }).then(trx.commit)
        .catch(trx.rollback)
    }).catch(err => {
      res.status(400).json({ success: false, error: "user registration failed" })
    })
  }
);

app.put(
  "/image",
  (
    req: { body: { id: any } },
    res: { json: (arg0: { success: boolean; message: string; data: { entries: any; }; }) => void; status: (arg0: number) => { (): any; new(): any; send: { (arg0: { success: boolean; message?: string; error?: string; }): void; new(): any; }; }; }
  ) => {
    const { id } = req.body;
    database('users')
      .where({ id: id })
      .increment('entries', 1)
      .returning('entries')
      .then(entries => {
        if (entries.length) {
          res.json({
            success: true,
            message: "entries updated",
            data: { entries: entries[0] },
          });
        }
        else {
          res.status(404).send({ success: false, message: "user not found" });
        }
      }).catch(err => {
        res.status(400).send({ success: false, error: "failed to update entries" });
      })
  }
);

export { app };
