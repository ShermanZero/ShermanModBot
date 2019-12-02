import { GuildMember } from "discord.js";
import * as ncp from "ncp";
import * as path from "path";
import * as fs from "fs";

import rsrc from "../resources";
import { Client } from "discord.js";

module.exports = async (client: Client, member: GuildMember): Promise<boolean> => {
  let username = rsrc.getUsernameFromMember(member);
  let memberDir = rsrc.getMemberDirectoryFromGuild(member.guild, username);
  let guildDir = rsrc.getGuildDirectoryFromGuild(member.guild);

  let removed: any;

  if (!fs.existsSync(memberDir)) return true;

  ncp(memberDir, (removed = path.join(guildDir, client.discordConfig.files.removed, username)), { clobber: true }, (err): boolean => {
    if (err) {
      `Failed to transfer [${username}] to ${removed}`.error();
      return false;
    }

    `Member [${username.magenta}] just left the guild [${rsrc.getGuildNameFromGuild(member.guild).magenta}]`.warning(true);
    return true;
  });

  client.deleteMember(member.guild, username);

  return true;
};
