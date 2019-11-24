require("colors");

const path = require("path");
const ncp = require("ncp").ncp;
const Resources = require(path.join(__dirname, "..", "classes", "Resources.js"));

module.exports = (client, member) => {
    let username = Resources.getUsernameFromMember(member);
    let userDir = Resources.getUserDirectoryFromGuild(member.guild, username);
    let guildDir = Resources.getGuildDirectoryFromGuild(member.guild);

    ncp(userDir, removed = path.join(guildDir, client.config.files.removed, username), { clobber: true }, (err) => {
        if(err)
            return console.error(`!! Failed to transfer [${username}] to ${removed}`);

        console.log(`Member [${username.magenta}] just left the guild [${Resources.getGuildNameFromGuild(member.guild).magenta}]`);
    });

    client.deleteUser(member.guild, username);
}
