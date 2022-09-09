import express from "express";
import view from "./api/view";
import resize from "./api/resize";
import clear from "./api/clear";

const routes = express.Router();

routes.get("/", (req, res) => {
  res.status(200).send("Root Api Route");
});

routes.use("/view", view);
routes.use("/resize", resize);
routes.use("/clear", clear);

export default routes;
