import express from 'express';
import files from '../../util/file';

const resize = express.Router();

const errorStatus = 410; // Status indicating error in General so we can test with it.

resize.get("/", async (req, res) => {
    const fn = req.query.filename as string;
    const w = req.query.width as string;
    const h = req.query.height as string;
    if (typeof fn === "undefined" || typeof w === "undefined" || typeof h === "undefined" ){
        res.status(errorStatus).send("Please Enter valid form")
        return;
    }
    const fileName = fn.replace(/['"]+/g, '');
    const width = parseInt(w);
    const height = parseInt(h);
    if(!fileName){
        res.status(errorStatus).send("Please Enter a file name");
        return;
    }
    if(Number.isNaN(width) || Number.isNaN(height) || width <= 0 || height <= 0){
        res.status(errorStatus).send("Please Enter valid form")
        return;
    }

    const foundinOG = await files.isOgImageFound(fileName);
    if(!foundinOG){
        res.status(errorStatus).send("Image not found in images/original folder. Please check name and extension");
        return;
    }

    const imgInfo = files.getRszImagePath(fileName, width, height);
    const foundinRsz = await files.isRszImageFound(imgInfo[0]);
    if(!foundinRsz){
        const info = await files.resizeImage(fileName, width, height);
    }
    const imgPath = imgInfo[2];
    res.status(200).sendFile(imgPath);
    
});

export default resize