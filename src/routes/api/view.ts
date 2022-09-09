import express from 'express';
import files from '../../util/file';

const view = express.Router();

const errorStatus = 410; // Status indicating error in General so we can test with it.

view.get("/", async (req, res) => {
    const fn = req.query.filename as string;
    if (typeof fn === "undefined"){
        res.status(errorStatus).send("Please Enter valid form")
        return;
    }
    const fileName = fn.replace(/['"]+/g, '');
    if(!fileName){
        res.status(errorStatus).send("Please Enter a file name");
        return;
    }
    const found = await files.isOgImageFound(fileName);
    if(!found){
        res.status(errorStatus).send("Image not found in images/original folder. Please check name and extension");
        return;
    }
    const imgPath  = files.getOgImagePath(fileName);
    res.status(200).sendFile(imgPath);
});

export default view