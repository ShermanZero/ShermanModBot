import "colors";

import path from "path";
import ncp from "ncp";
import rsrc from "../classes/Resources";

module.exports = (client, member) => {
    let username = rsrc.getUsernameFromMember(member);
    let userDir = rsrc.getUserDirectoryFromGuild(member.guild, username);
    let guildDir = rsrc.getGuildDirectoryFromGuild(member.guild);

    let removed: any;
    ncp(userDir, removed = path.join(guildDir, client.config.files.removed, username), { clobber: true }, (err) => {
        if(err)
            return console.error(`!! Failed to transfer [${username}] to ${removed}`);

        console.log(`Member [${username.magenta}] just left the guild [${rsrc.getGuildNameFromGuild(member.guild).magenta}]`);
    });

    client.deleteUser(member.guild, username);
}
