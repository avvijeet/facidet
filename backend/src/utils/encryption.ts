import bcrypt from "bcrypt";
import { response } from "express";
import { database } from "./db";
const saltRounds = 10;

const getHash = (password: string) => {
  return bcrypt.hashSync(password, saltRounds);

};

const compareHash = (hashFromDb: string, password: string) => {
  return bcrypt.compareSync(password, hashFromDb)
}

export { getHash, compareHash };
