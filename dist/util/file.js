"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const ogImagePath = path_1.default.resolve(__dirname, "../../images/original");
const rszImagePath = path_1.default.resolve(__dirname, "../../images/resized");
console.log(ogImagePath, rszImagePath);
const isOgImageFound = async (fileName) => {
    const imgPath = path_1.default.resolve(ogImagePath, fileName);
    try {
        await fs_1.promises.access(imgPath);
        return true;
    }
    catch (error) {
        // console.log(error);
        return false;
    }
};
const isRszImageFound = async (fileName) => {
    const imgPath = path_1.default.resolve(rszImagePath, fileName);
    try {
        await fs_1.promises.access(imgPath);
        return true;
    }
    catch (error) {
        // console.log(error);
        return false;
    }
};
exports.default = { isOgImageFound, isRszImageFound };
