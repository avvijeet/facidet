"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const database = {
    users: [
        {
            id: 1234,
            name: "Joey",
            email: "joey@gmail.com",
            password: "$2b$10$L9//zMwD1UXnjHBhsl7uqeMhcfsPVurlHHeFXd9QyTLUdoEfkRz5O",
            entries: 0,
            joined: new Date(),
        },
        {
            id: 1235,
            name: "Jenny",
            email: "jenny@yahoo.com",
            password: "$2b$10$kJsLenudVAtu0jYAM3NkHeRkBGOr0bxXezKmCeP8MrB/td8fUG9.e",
            entries: 0,
            joined: new Date(),
        },
    ],
};
exports.database = database;
