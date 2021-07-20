const Clarifai = require("clarifai");

const clarifaiApp = new Clarifai.App({
  apiKey: "ac79631359d247559d7e2a9f0e8d8cbe",
});

const clarifai = (
  req: { body: { input: any } },
  res: {
    json: (arg0: { success: boolean; data: any }) => any;
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
  const { input } = req.body;
  clarifaiApp.models
    .predict(Clarifai.FACE_DETECT_MODEL, input)
    .then((response: any) => {
      return res.json({
        success: true,
        data: response,
      });
    })
    .catch((err: any) => {
      res.status(400).json({ success: false, message: "detection failed" });
    });
};

export { clarifai };
