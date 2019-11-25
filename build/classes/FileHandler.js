"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var FileHandler = /** @class */ (function () {
    function FileHandler() {
    }
    FileHandler.readDataFromFile = function (filePath) {
        var data = fs_1.default.readFileSync(filePath, "utf8");
        return data;
    };
    FileHandler.writeDataToFile = function (data, filePath) {
        fs_1.default.writeFileSync(filePath, data);
    };
    FileHandler.appendDataToFile = function (data, filePath) {
        fs_1.default.appendFileSync(filePath, data);
    };
    FileHandler.deleteFile = function (filePath) {
        fs_1.default.unlinkSync(filePath);
    };
    return FileHandler;
}());
exports.default = FileHandler;
module.exports = FileHandler;
//# sourceMappingURL=FileHandler.js.map