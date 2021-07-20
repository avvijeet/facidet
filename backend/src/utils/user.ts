import { database } from "./db";

const findUser = (id: any) => {
  return database("users").where({ id: id });
};

const findUserByEmail = (email: string, db: string) => {
  return database(db).where({ email: email });
};

export { findUser, findUserByEmail };
