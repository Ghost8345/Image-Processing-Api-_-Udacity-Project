import express from "express";
import { readdirSync, rmSync } from "fs";
import path from "path";

const clear = express.Router();

clear.get("/", (req: express.Request, res: express.Response): void => {
  const dir = path.resolve(__dirname, "../../../images/resized");
  readdirSync(dir).forEach((f: unknown) => rmSync(`${dir}/${f}`));
  res.status(200).send("resized folder cleared");
});

export default clear;
