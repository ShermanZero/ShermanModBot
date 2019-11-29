import { GuildMember } from "discord.js";
import * as ncp from "ncp";
import * as path from "path";

import rsrc from "../resources/resources";

module.exports = (client: any, member: GuildMember) => {
  let username = rsrc.getUsernameFromMember(member);
  let userDir = rsrc.getMemerDirectoryFromGuild(member.guild, username);
  let guildDir = rsrc.getGuildDirectoryFromGuild(member.guild);

  let removed: any;
  ncp(userDir, (removed = path.join(guildDir, client.config.files.removed, username)), { clobber: true }, err => {
    if (err) return `Failed to transfer [${username}] to ${removed}`.error();

    `Member [${username.magenta}] just left the guild [${rsrc.getGuildNameFromGuild(member.guild).magenta}]`.warning(true);
  });

  client.deleteUser(member.guild, username);
};
