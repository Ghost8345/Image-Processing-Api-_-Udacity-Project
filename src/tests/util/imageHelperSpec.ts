import imageHelpers from "../../util/imageHelper";
import { readdirSync, rmSync } from "fs";
import path from "path";

describe("Check if file is being found or not", function () {
  it("checks if image is in original folder", async () => {
    const bool = await imageHelpers.isOgImageFound("fjord.jpg");
    expect(bool).toEqual(true);
  });
  it("checks if image is not in original folder", async () => {
    const bool = await imageHelpers.isOgImageFound("asdfg.jpg");
    expect(bool).toEqual(false);
  });
});

describe("Check Resizing Functionality and Caching", () => {
  it("Checks if image is resized properly", async () => {
    const result = await imageHelpers.resizeImage("palmtunnel.jpg", 600, 400);
    expect(result).toEqual("Resized");
  });
  it("Checks if parameters are negative", async () => {
    const result = await imageHelpers.resizeImage("encenadaport.jpg", -600, 400);
    expect(result).toEqual("Wrong Parameters");
  });
  it("Checks if File Name is omitted", async () => {
    const result = await imageHelpers.resizeImage("", 500, 500);
    expect(result).toEqual("Wrong Parameters");
  });

  it("Checks if File will be cached and not resized again", async () => {
    let result = await imageHelpers.resizeImage("santamonica.jpg", 500, 500);
    expect(result).toEqual("Resized");
    result = await imageHelpers.resizeImage("santamonica.jpg", 500, 500);
    expect(result).toEqual("Already Resized");
  });

  describe("Check diffrent file types", function () {
    it("checks jpeg format", async () => {
      const result = await imageHelpers.resizeImage("tunnel.jpeg", 600, 400);
      expect(result).toEqual("Resized");
    });
    it("checks png format", async () => {
      const result = await imageHelpers.resizeImage("sun.png", 600, 400);
      expect(result).toEqual("Resized");
    });
  });

  afterAll(() => {
    const dir = path.resolve(__dirname, "../../../images/resized");
    console.log(dir);

    readdirSync(dir).forEach((f: unknown) => rmSync(`${dir}/${f}`));
  });
});
