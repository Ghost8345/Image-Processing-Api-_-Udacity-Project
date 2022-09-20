import supertest from "supertest";
import app from "../..";
import sizeOf from "image-size";
import path from "path";
import { readdirSync, rmSync } from "fs";

const request = supertest(app);

describe("Test endpoint responses for resize Route", () => {
  it("checks when width or height are not entered", async (): Promise<void> => {
    const response = await request.get("/api/resize?filename=tunnel.jpeg");
    expect(response.text).toEqual("Please Enter valid form");
    expect(response.status).toBe(410);
  });
  it("checks when width or height are not numbers", async (): Promise<void> => {
    const response = await request.get(
      "/api/resize?filename=tunnel.jpeg&width=jas&height=ray"
    );
    expect(response.text).toEqual("Please Enter valid form");
    expect(response.status).toBe(410);
  });
  it("checks when width or height are negative numbers", async (): Promise<void> => {
    const response = await request.get(
      "/api/resize?filename=tunnel.jpeg&width=-723&height=-100"
    );
    expect(response.text).toEqual("Please Enter valid form");
    expect(response.status).toBe(410);
  });
  it("checks when image is not found in original folder", async (): Promise<void> => {
    const response = await request.get(
      "/api/resize?filename=nonsense.pow&width=300&height=200"
    );
    expect(response.text).toEqual(
      "Image not found in images/original folder. Please check name and extension"
    );
    expect(response.status).toBe(410);
  });
  it("checks when image is  resized properly", async (): Promise<void> => {
    const response = await request.get(
      "/api/resize?filename=fjord.jpg&width=500&height=500"
    );
    const dimensions = sizeOf(
      path.resolve(__dirname, "../../../images/resized/fjord_500_500.jpg")
    );
    expect(dimensions.width).toBe(500);
    expect(dimensions.height).toBe(500);
    expect(response.status).toBe(200);
  });
  it("checks when image is resized properly again", async (): Promise<void> => {
    const response = await request.get(
      "/api/resize?filename=tunnel.jpeg&width=700&height=600"
    );
    const dimensions = sizeOf(
      path.resolve(__dirname, "../../../images/resized/tunnel_700_600.jpeg")
    );
    expect(dimensions.width).toBe(700);
    expect(dimensions.height).toBe(600);
    expect(response.status).toBe(200);
  });

  afterAll(() => {
    const dir = path.resolve(__dirname, "../../../images/resized");

    readdirSync(dir).forEach((f: unknown) => rmSync(`${dir}/${f}`));
  });
});
