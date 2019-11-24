"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class FileHandler {
    static readDataFromFile(filePath) {
        var data = fs_1.default.readFile('DATA', 'utf8', filePath);
        return data;
    }
    static writeDataToFile(data, filePath) {
        fs_1.default.writeFileSync(filePath, data);
    }
    static appendDataToFile(data, filePath) {
        fs_1.default.appendFileSync(filePath, data);
    }
    static deleteFile(filePath) {
        fs_1.default.unlinkSync(filePath);
    }
}
exports.default = FileHandler;
//# sourceMappingURL=FileHandler.js.map