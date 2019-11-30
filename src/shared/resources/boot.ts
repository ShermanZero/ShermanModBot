import * as fs from "fs";
import * as path from "path";

const bootLogo = fs.readFileSync(path.resolve(__dirname, "boot.txt"), "utf8");

//returns the default boot logo
export default bootLogo;
export const bootFooter = "=====================================================================================";
