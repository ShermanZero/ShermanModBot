"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../classes/StringHandler");
const Resources_1 = __importDefault(require("../classes/Resources"));
exports.props = {
    "requiresElevation": "mod",
    "description": "displays all users registered in the server",
    "usage": ""
};
exports.run = (client, message, args) => {
    let guildUsers = Resources_1.default.getGuildUsersFromGuild(message.guild);
    let allUsers = Object.keys(guildUsers);
    message.reply(`here are the current registered users of the server:\n[**${allUsers.join("**, **")}**]`);
};
//# sourceMappingURL=users.js.map