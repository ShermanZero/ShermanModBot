import fs from 'fs';

export default class FileHandler {

  static readDataFromFile(filePath: string) {
    var data = fs.readFileSync(filePath, 'utf8');
    return data;
  }

  static writeDataToFile(data, filePath) {
    fs.writeFileSync(filePath, data);
  }

  static appendDataToFile(data, filePath) {
    fs.appendFileSync(filePath, data);
  }

  static deleteFile(filePath) {
    fs.unlinkSync(filePath);
  }

}