import * as fs from 'fs';
import * as path from 'path';

let boot: string;
boot = fs.readFileSync(path.resolve(__dirname, "boot.txt"), "utf8");

//returns the default boot logo
export default boot;
