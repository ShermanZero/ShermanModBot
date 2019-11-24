import fs from 'fs';

export default class FileHandler {

  static readDataFromFile(filePath) {
    var data = fs.readFile('DATA', 'utf8', filePath);
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