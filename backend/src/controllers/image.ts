import { Knex } from "knex";

const image = (
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
        (arg0: { success: boolean; message?: string; error?: string }): void;
        new (): any;
      };
    };
  },
  database: Knex<any, unknown[]>
) => {
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
      } else {
        res.status(404).send({ success: false, message: "user not found" });
      }
    })
    .catch((err) => {
      res
        .status(400)
        .send({ success: false, error: "failed to update entries" });
    });
};

export { image };
