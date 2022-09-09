import express from "express";
import files from "./util/file"
import routes from "./routes";

const app = express();
const port = 3000;

app.use("/api", routes);

app.listen(port, async () : Promise<void>=> {
 await files.checkResizedFolder()
 console.log(`server started at localhost:${port}`)
});

app.get('/', (req, res) =>{
  res.status(200).send("<h1>Hello to our Image Processing API</h1>")

});

export default app