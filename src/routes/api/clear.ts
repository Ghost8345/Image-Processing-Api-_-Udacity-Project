import express from "express";
import files from "../../util/file";
import { readdirSync, rmSync } from "fs";

const clear = express.Router();

clear.get("/", (req, res) => {
  const dir = files.rszFilePath;
  readdirSync(dir).forEach((f: unknown) => rmSync(`${dir}/${f}`));
  res.status(200).send("resized folder cleared");
});

export default clear;
