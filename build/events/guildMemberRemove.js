"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
const path_1 = __importDefault(require("path"));
const ncp_1 = __importDefault(require("ncp"));
const Resources_1 = __importDefault(require("../classes/Resources"));
module.exports = (client, member) => {
    let username = Resources_1.default.getUsernameFromMember(member);
    let userDir = Resources_1.default.getUserDirectoryFromGuild(member.guild, username);
    let guildDir = Resources_1.default.getGuildDirectoryFromGuild(member.guild);
    let removed;
    ncp_1.default(userDir, removed = path_1.default.join(guildDir, client.config.files.removed, username), { clobber: true }, (err) => {
        if (err)
            return console.error(`!! Failed to transfer [${username}] to ${removed}`);
        console.log(`Member [${username.magenta}] just left the guild [${Resources_1.default.getGuildNameFromGuild(member.guild).magenta}]`);
    });
    client.deleteUser(member.guild, username);
};
//# sourceMappingURL=guildMemberRemove.js.map