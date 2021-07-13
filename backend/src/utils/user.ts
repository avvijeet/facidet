import { database } from "./db";

const findUser = (id: any) => {
  const users = database.users;
  let userFound = false;
  let i = 0;
  for (; i < users.length; i++) {
    if (users[i].id === Number(id)) {
      userFound = true;
      break;
    }
  }
  if (userFound) {
    return users[i];
  }
  return userFound;
};

const findUserByEmail = (email: string) => {
  const users = database.users;
  let userFound = false;
  let i = 0;
  for (; i < users.length; i++) {
    if (users[i].email === email) {
      userFound = true;
      break;
    }
  }
  if (userFound) {
    return users[i];
  }
  return userFound;
};

export { findUser, findUserByEmail };
