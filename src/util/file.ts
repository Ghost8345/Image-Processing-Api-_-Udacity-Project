import { promises as fs } from "fs";
import path from "path";
import sharp from 'sharp';

const ogFilePath = path.resolve(__dirname, "../../images/original");
const rszFilePath = path.resolve(__dirname, "../../images/resized");

const checkResizedFolder = async () : Promise<void> => {
    try {
        await fs.access(rszFilePath)
    } catch (error) {
        try {
            await fs.mkdir(rszFilePath);
        } catch (error) {
        }
        
    }
}

const getOgImagePath = (fileName : string) : string => {
    const imgPath = path.resolve(ogFilePath, fileName);
    return imgPath;
}

const getRszImagePath = (fileName: string, width: number, height: number): [string, keyof sharp.FormatEnum, string] => {
    const sourcePath = path.resolve(ogFilePath, fileName);
    const index = fileName.lastIndexOf(".");
    const name = fileName.slice(0, index);
    const extension = fileName.slice(index);
    const format = extension.slice(1) as keyof sharp.FormatEnum ;
    const NewFileName = `${name}_${width}_${height}${extension}`;
    const destinationPath = path.resolve(rszFilePath, NewFileName);
    return [NewFileName, format, destinationPath]
}


const  isOgImageFound = async (fileName : string): Promise<boolean> => {

    const imgPath = getOgImagePath(fileName);
    try {
        
        await fs.access(imgPath);
        return true;
        
    } catch (error) {
        return false;

    }
}

const  isRszImageFound = async (fileName : string) : Promise<boolean> => {

    const imgPath = path.resolve(rszFilePath, fileName);
    try {
        
        await fs.access(imgPath);
        return true;
        
    } catch (error) {
        return false;

    }
}

const resizeImage = async (fileName: string, width: number, height: number) : Promise<string> => {
    try {
        if(width <= 0 || height <= 0 || !fileName)
            return "Wrong Parameters"
        const [newFileName, format, destinationPath] = getRszImagePath(fileName, width, height);
        const found = await isRszImageFound(newFileName);
        if(found){
            return "Already Resized";
        }
        
        await sharp(getOgImagePath(fileName))
          .resize(width, height)
          .toFormat(format)
          .toFile(destinationPath);
        return "Resized";
      } catch {
        return 'Could not Resize';
      }
    
}


export default {isOgImageFound, isRszImageFound, resizeImage, checkResizedFolder , getOgImagePath, getRszImagePath, rszFilePath};

