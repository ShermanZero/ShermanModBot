"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
class FileHandler {
    static readDataFromFile(filePath) {
        var data = fs_1.default.readFileSync(filePath, "utf8");
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