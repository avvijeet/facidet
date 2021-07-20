import { database } from "../utils/db";
import { app } from "./config";
import {
  clarifai,
  image,
  profile,
  register,
  root,
  signIn,
} from "../controllers/index";

app.get(
  "/",
  (req: any, res: { json: (arg0: { success: boolean }) => void }) => {
    root(req, res);
  }
);

app.get(
  "/profile/:id",
  (
    req: { params: { id: any } },
    res: {
      json: (arg0: { success: boolean; data: any[] }) => void;
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
    profile(req, res);
  }
);

app.post(
  "/signin",
  (
    req: { body: { email: any; password: any } },
    res: {
      json: (arg0: {
        success: boolean;
        message: string;
        data: { user: any };
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
    signIn(req, res, database);
  }
);

app.post(
  "/register",
  (
    req: { body: { name: any; email: any; password: any } },
    res: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: {
          (arg0: {
            success: boolean;
            message?: string | undefined;
            data?: { user: any } | undefined;
            error?: string | undefined;
          }): void;
          new (): any;
        };
      };
    }
  ) => {
    register(req, res, database);
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
        data: { entries: any };
      }) => void;
      status: (arg0: number) => {
        (): any;
        new (): any;
        send: {
          (arg0: {
            success: boolean;
            message?: string | undefined;
            error?: string | undefined;
          }): void;
          new (): any;
        };
      };
    }
  ) => {
    image(req, res, database);
  }
);

app.post(
  "/detect",
  (
    req: { body: { input: any } },
    res: {
      json: (arg0: { success: boolean; data: any }) => void;
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
    clarifai(req, res);
  }
);

export { app };
