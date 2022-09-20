import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";

const checkResizedFolder = async (): Promise<void> => {
  const rszFilePath = path.resolve(__dirname, "../../images/resized");
  try {
    await fs.access(rszFilePath);
  } catch (error) {
    try {
      await fs.mkdir(rszFilePath);
    } catch (error) {
      console.log(error);
    }
  }
};

const isOgImageFound = async (fileName: string): Promise<boolean> => {
  const imgPath = getOgImagePath(fileName);
  try {
    await fs.access(imgPath);
    return true;
  } catch (error) {
    return false;
  }
};

const isRszImageFound = async (fileName: string): Promise<boolean> => {
  const rszFilePath = path.resolve(__dirname, "../../images/resized");
  const imgPath = path.resolve(rszFilePath, fileName);
  try {
    await fs.access(imgPath);
    return true;
  } catch (error) {
    return false;
  }
};

const getOgImagePath = (fileName: string): string => {
  const ogFilePath = path.resolve(__dirname, "../../images/original");
  const imgPath = path.resolve(ogFilePath, fileName);
  return imgPath;
};

const getRszImagePath = (
  fileName: string,
  width: number,
  height: number
): [string, keyof sharp.FormatEnum, string] => {
  const rszFilePath = path.resolve(__dirname, "../../images/resized");
  const index = fileName.lastIndexOf(".");
  const name = fileName.slice(0, index);
  const extension = fileName.slice(index);
  const format = extension.slice(1) as keyof sharp.FormatEnum;
  const NewFileName = `${name}_${width}_${height}${extension}`;
  const destinationPath = path.resolve(rszFilePath, NewFileName);
  return [NewFileName, format, destinationPath];
};



const resizeImage = async (
  fileName: string,
  width: number,
  height: number
): Promise<string> => {
  try {
    if (width <= 0 || height <= 0 || !fileName) return "Wrong Parameters";
    const [newFileName, format, destinationPath] = getRszImagePath(
      fileName,
      width,
      height
    );
    const found = await isRszImageFound(newFileName);
    if (found) {
      return "Already Resized";
    }

    await sharp(getOgImagePath(fileName))
      .resize(width, height)
      .toFormat(format)
      .toFile(destinationPath);
    return "Resized";
  } catch {
    return "Could not Resize";
  }
};

export default {
  isOgImageFound,
  isRszImageFound,
  resizeImage,
  checkResizedFolder,
  getOgImagePath,
  getRszImagePath
};
