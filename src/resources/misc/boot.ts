import * as fs from 'fs';

let boot: string;
boot = fs.readFileSync("boot.txt", "utf8");

export default boot;