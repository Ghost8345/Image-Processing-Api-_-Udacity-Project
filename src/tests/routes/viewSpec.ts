import supertest from "supertest";
import app from "../..";

const request = supertest(app);

describe("Test endpoint responses for view Route", () => {
  it("checks when filename is not entered", async (): Promise<void> => {
    const response = await request.get("/api/view");
    expect(response.text).toEqual("Please Enter valid form");
    expect(response.status).toBe(410);
  });
  it("checks when filename empty but found as a query", async (): Promise<void> => {
    const response = await request.get("/api/view?filename=");
    expect(response.text).toEqual("Please Enter a file name");
    expect(response.status).toBe(410);
  });
  it("checks when image is not found in original folder", async (): Promise<void> => {
    const response = await request.get("/api/view?filename=nonsense.pow");
    expect(response.text).toEqual(
      "Image not found in images/original folder. Please check name and extension"
    );
    expect(response.status).toBe(410);
  });
  it("checks when image is  found in original folder", async (): Promise<void> => {
    const response = await request.get("/api/view?filename=fjord.jpg");
    expect(response.status).toBe(200);
  });
});
