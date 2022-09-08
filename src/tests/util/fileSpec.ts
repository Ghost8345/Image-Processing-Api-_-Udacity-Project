import files from "../../util/file"

describe("Check if file is being found or not", function(){
    it("checks if image is in original folder", async () => {
        const bool = await files.isOgImageFound("fjord.jpg");
        expect(bool).toEqual(true);
    });
    it("checks if image is not in original folder", async () => {
        const bool = await files.isOgImageFound("asdfg.jpg");
        expect(bool).toEqual(false);
    });
});