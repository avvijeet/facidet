"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.image = void 0;
const image = (req, res, database) => {
    const { id } = req.body;
    database("users")
        .where({ id: id })
        .increment("entries", 1)
        .returning("entries")
        .then((entries) => {
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
    })
        .catch((err) => {
        res
            .status(400)
            .send({ success: false, error: "failed to update entries" });
    });
};
exports.image = image;
