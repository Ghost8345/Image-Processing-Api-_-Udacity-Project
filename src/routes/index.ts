import express from 'express';
import view from './api/view';
import resize from './api/resize';

const routes = express.Router();

routes.get("/", (req, res) => {
    res.status(200).send("Root Api Route")
})

routes.use("/view",view);
routes.use("/resize", resize);

export default routes