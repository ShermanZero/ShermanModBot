"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
var ncp_1 = __importDefault(require("ncp"));
var path_1 = __importDefault(require("path"));
var Resources_1 = __importDefault(require("../classes/Resources"));
module.exports = function (client, member) {
    var username = Resources_1.default.getUsernameFromMember(member);
    var userDir = Resources_1.default.getUserDirectoryFromGuild(member.guild, username);
    var guildDir = Resources_1.default.getGuildDirectoryFromGuild(member.guild);
    var removed;
    ncp_1.default(userDir, (removed = path_1.default.join(guildDir, client.config.files.removed, username)), { clobber: true }, function (err) {
        if (err)
            return console.error("!! Failed to transfer [" + username + "] to " + removed);
        console.log("Member [" + username.magenta + "] just left the guild [" + Resources_1.default.getGuildNameFromGuild(member.guild).magenta + "]");
    });
    client.deleteUser(member.guild, username);
};
//# sourceMappingURL=guildMemberRemove.js.map