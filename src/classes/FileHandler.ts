import * as fs from 'fs';

export default class FileHandler {
  static readDataFromFile(filePath: string): string {
    let data = fs.readFileSync(filePath, "utf8");
    return data;
  }

  static writeDataToFile(data: string, filePath: string) {
    fs.writeFileSync(filePath, data);
  }

  static appendDataToFile(data: string, filePath: string) {
    fs.appendFileSync(filePath, data);
  }

  static deleteFile(filePath: string) {
    fs.unlinkSync(filePath);
  }
}
