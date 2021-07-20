const root = (
  req: any,
  res: {
    json: (arg0: { success: boolean }) => void;
  }
) => {
  res.json({ success: true });
};

export { root };
