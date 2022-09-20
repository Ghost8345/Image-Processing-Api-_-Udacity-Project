import express from "express";
import imageHelpers from "../../util/imageHelper";

const resize = express.Router();

const errorStatus = 410; // Status indicating error in General so we can test with it.

resize.get(
  "/",
  async (req: express.Request, res: express.Response): Promise<void> => {
    const fn = req.query.filename as string;
    const w = req.query.width as string;
    const h = req.query.height as string;
    if (
      typeof fn === "undefined" ||
      typeof w === "undefined" ||
      typeof h === "undefined"
    ) {
      res.status(errorStatus).send("Please Enter valid form");
      return;
    }
    const fileName = fn.replace(/['"]+/g, "");
    const width = parseInt(w);
    const height = parseInt(h);
    if (!fileName) {
      res.status(errorStatus).send("Please Enter a file name");
      return;
    }
    if (
      Number.isNaN(width) ||
      Number.isNaN(height) ||
      width <= 0 ||
      height <= 0
    ) {
      res.status(errorStatus).send("Please Enter valid form");
      return;
    }

    const foundinOG = await imageHelpers.isOgImageFound(fileName);
    if (!foundinOG) {
      res
        .status(errorStatus)
        .send(
          "Image not found in images/original folder. Please check name and extension"
        );
      return;
    }

    const imgInfo = imageHelpers.getRszImagePath(fileName, width, height);
    const foundinRsz = await imageHelpers.isRszImageFound(imgInfo[0]);
    if (!foundinRsz) {
      const info = await imageHelpers.resizeImage(fileName, width, height);
      console.log(info);
    }
    const imgPath = imgInfo[2];
    res.status(200).sendFile(imgPath);
  }
);

export default resize;
