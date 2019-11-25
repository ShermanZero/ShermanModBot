"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
const ncp_1 = require("ncp");
const path_1 = require("path");
const Resources_1 = require("../classes/Resources");
module.exports = (client, member) => {
    let username = Resources_1.default.getUsernameFromMember(member);
    let userDir = Resources_1.default.getUserDirectoryFromGuild(member.guild, username);
    let guildDir = Resources_1.default.getGuildDirectoryFromGuild(member.guild);
    let removed;
    ncp_1.default(userDir, (removed = path_1.default.join(guildDir, client.config.files.removed, username)), { clobber: true }, err => {
        if (err)
            return console.error(`!! Failed to transfer [${username}] to ${removed}`);
        console.log(`Member [${username.magenta}] just left the guild [${Resources_1.default.getGuildNameFromGuild(member.guild).magenta}]`);
    });
    client.deleteUser(member.guild, username);
};
//# sourceMappingURL=guildMemberRemove.js.map