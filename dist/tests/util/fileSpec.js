"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const file_1 = __importDefault(require("../../util/file"));
describe("Check if file is being found or not", function () {
    it("checks if image is in original folder", async () => {
        const bool = await file_1.default.isOgImageFound("fjord.jpg");
        expect(bool).toEqual(true);
    });
    it("checks if image is not in original folder", async () => {
        const bool = await file_1.default.isOgImageFound("asdfg.jpg");
        expect(bool).toEqual(false);
    });
});
