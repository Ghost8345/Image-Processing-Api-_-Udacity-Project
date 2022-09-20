import express from "express";
import imageHelpers from "./util/imageHelper";
import routes from "./routes";

const app = express();
const port = 3000;

app.use("/api", routes);

app.listen(port, async (): Promise<void> => {
  await imageHelpers.checkResizedFolder();
  console.log(`server started at localhost:${port}`);
});

app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      "<h1>Welcome to our Image Processing API</h1> <h2> Some useful Instructions Below</h2> <p> For viewing an image in the original folder you can use /api/view?filename=... and enter your filename as you like but with an extension and most picture extensions are accepted (PNG, JPG, JPEG) <p>For Resizing an image you can use /api/resize?filename=...&width=...&height=... with all queries mandatory and width and height must be positive numbers. Caching is available not to waste resources. You'll find your resized image in resized folder with your chosen dimensions</p <p>For clearing the resized folder you can visit api/clear </p>"
    );
});

export default app;
