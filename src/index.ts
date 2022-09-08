import express from "express";
const app = express();
const port = 3000;

app.listen(port, () : void=> {
 console.log(`server started at localhost:${port}`)
});

app.get('/', (req, res) =>{
  res.status(200).send("Hello to our Image Processing API")

});

export default app