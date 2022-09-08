import { promises as fs } from "fs";
import path from "path";
import sharp from 'sharp';

const ogImagePath = path.resolve(__dirname, "../../images/original");
const rszImagePath = path.resolve(__dirname, "../../images/resized");


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

const resizeImage = async (fileName: string, width: number, height: number) : Promise<string> => {
    try {
        if(width <= 0 || height <= 0 || !fileName)
            return "Wrong Parameters"
        const sourcePath = path.resolve(ogImagePath, fileName);
        console.log(sourcePath);
        const index = fileName.lastIndexOf(".");
        const name = fileName.slice(0, index);
        const extension = fileName.slice(index)
        const NewFileName = `${name}_${width}_${height}${extension}`;
        const found = await isRszImageFound(NewFileName);
        if(found){
            return "Already Resized";
        }
        const destinationPath = path.resolve(rszImagePath, NewFileName);
        console.log(destinationPath);
        await sharp(sourcePath)
          .resize(width, height)
          .toFormat('jpeg')
          .toFile(destinationPath);
        return "Resized";
      } catch {
        return 'Could not Resize';
      }
    
}

export default {isOgImageFound, isRszImageFound, resizeImage, rszImagePath};

