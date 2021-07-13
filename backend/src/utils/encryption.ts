import bcrypt from "bcrypt";
import { database } from "./db";
import { findUserByEmail } from "./user";
const saltRounds = 10;

const saveInfoInDb = (userInput: any) => {
  const { name, email, password } = userInput;
  //   bcrypt.hash(password, saltRounds, (err: any, hash: any) => {
  //     // Store hash in your password DB.
  //     if (err) {
  //       console.error(err);
  //     }
  //     const newUser = {
  //       id: 1236,
  //       name: name,
  //       email: email,
  //       password: hash,
  //       entries: 0,
  //       joined: new Date(),
  //     };
  //     database.users.push(newUser);
  //     return newUser;
  //   });
  const hash = bcrypt.hashSync(password, saltRounds);
  const newUser = {
    id: 1236,
    name: name,
    email: email,
    password: hash,
    entries: 0,
    joined: new Date(),
  };
  database.users.push(newUser);
  newUser.password = ""
  return newUser;
};

const checkUser = (userInput: any) => {
  //... fetch user from a db etc.
  const { email, password } = userInput;
  const user = findUserByEmail(email);
  if (user) {
    const res =  [bcrypt.compareSync(password, user.password), user];
    // user.password = "";
    return res
  }

  return [false, null];
};

export { saveInfoInDb, checkUser };
