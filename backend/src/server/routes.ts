import { saveInfoInDb, checkUser } from "../utils/encryption";
import { database } from "../utils/db";
import { findUser } from "../utils/user";
import { app } from "./config";

app.get(
  "/",
  (
    req: any,
    res: {
      json: (arg0: {
        success: boolean;
        data: {
          id: number;
          name: string;
          email: string;
          password: string;
          entries: number;
          joined: Date;
        }[];
      }) => void;
    }
  ) => {
    res.json({ success: true, data: database.users });
  }
);

app.get(
  "/profile/:id",
  (
    req: { params: { id: any } },
    res: {
      json: (arg0: {
        success: boolean;
        data: {
          id: number;
          name: string;
          email: string;
          password: string;
          entries: number;
          joined: Date;
        };
      }) => void;
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: {
          (arg0: { success: boolean; message: string }): void;
          new (): any;
        };
      };
    }
  ) => {
    const { id } = req.params;
    const userFound = findUser(id);
    if (userFound) {
      res.json({ success: true, data: userFound });
    }
    res.status(404).json({ success: false, message: "user not found" });
  }
);

app.post(
  "/signin",
  (
    req: { body: { email: string; password: string } },
    res: {
      json: (arg0: {
        success: boolean;
        message: string;
        data: {
          user:
            | boolean
            | {
                id: number;
                name: string;
                email: string;
                password: string;
                entries: number;
                joined: Date;
              }
            | null;
        };
      }) => void;
      status: (arg0: number) => {
        (): any;
        new (): any;
        send: {
          (arg0: { success: boolean; message: string }): void;
          new (): any;
        };
      };
    }
  ) => {
    const [shouldSignIn, userData] = checkUser(req.body);
    if (shouldSignIn) {
      res.json({
        success: true,
        message: "user signedin",
        data: { user: userData },
      });
    } else {
      res.status(401).send({ success: false, message: "signin failed" });
    }
  }
);

app.post(
  "/register",
  (
    req: { body: any },
    res: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: {
          (arg0: {
            success: boolean;
            message: string;
            data: {
              user: {
                id: number;
                name: any;
                email: any;
                password: string;
                entries: number;
                joined: Date;
              };
            };
          }): void;
          new (): any;
        };
      };
    }
  ) => {
    const newUser = saveInfoInDb(req.body);
    res.status(201).json({
      success: true,
      message: "user registered",
      data: { user: newUser },
    });
  }
);

app.put(
  "/image",
  (
    req: { body: { id: any } },
    res: {
      json: (arg0: {
        success: boolean;
        message: string;
        data: { entries: number };
      }) => void;
      status: (arg0: number) => {
        (): any;
        new (): any;
        send: {
          (arg0: { success: boolean; message: string }): void;
          new (): any;
        };
      };
    }
  ) => {
    const { id } = req.body;
    let found = false;
    let entries = 0;
    database.users.forEach((user) => {
      if (user.id === id) {
        found = true;
        user.entries++;
        entries = user.entries;
        return;
      }
    });
    if (found) {
      res.json({
        success: true,
        message: "entries updated",
        data: { entries: entries },
      });
    } else {
      res.status(404).send({ success: false, message: "user not found" });
    }
  }
);

export { app };
