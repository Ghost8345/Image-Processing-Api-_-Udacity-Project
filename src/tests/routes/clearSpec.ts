import supertest from "supertest";
import app from "../..";
import { promises as fs } from "fs";
import path from "path";

const request = supertest(app);

describe("Test endpoint responses for clear Route", () => {
  it("checks if resized folder is cleared after adding an image in folder", async (): Promise<void> => {
    await request.get("/api/resize?filename=tunnel.jpeg&width=700&height=600");
    const response = await request.get("/api/clear");
    fs.readdir(path.resolve(__dirname, "../../../images/resized")).then(
      (files) => {
        expect(files.length === 0).toBe(true);
      }
    );
    expect(response.status).toBe(200);
  });
});
