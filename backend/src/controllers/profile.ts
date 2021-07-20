import { findUser } from "../utils/user";
const profile = (
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
  const { id } = req.params;
  const userFound = findUser(id);
  userFound
    .then((user) => {
      if (user.length) {
        res.json({ success: true, data: user });
      } else {
        res.status(404).json({ success: false, message: "user not found" });
      }
    })
    .catch((err) => {
      res
        .status(400)
        .json({ success: false, message: "failed to fetch user profile" });
    });
};

export { profile };
