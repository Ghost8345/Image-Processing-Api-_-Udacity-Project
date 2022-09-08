import { promises as fs } from "fs";
import path from "path";

const ogImagePath = path.resolve(__dirname, "../../images/original");
const rszImagePath = path.resolve(__dirname, "../../images/resized");
console.log(ogImagePath, rszImagePath);

const  isOgImageFound = async (fileName : string): Promise<boolean> => {

    const imgPath = path.resolve(ogImagePath, fileName);
    try {
        
        await fs.access(imgPath);
        return true;
        
    } catch (error) {
        // console.log(error);
        return false;

    }
}

const  isRszImageFound = async (fileName : string) => {

    const imgPath = path.resolve(rszImagePath, fileName);
    try {
        
        await fs.access(imgPath);
        return true;
        
    } catch (error) {
        // console.log(error);
        return false;

    }
}



export default {isOgImageFound, isRszImageFound};

