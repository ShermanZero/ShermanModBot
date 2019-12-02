import { GuildMember } from "discord.js";
import * as ncp from "ncp";
import * as path from "path";

import rsrc from "../resources";

module.exports = async (client: any, member: GuildMember): Promise<boolean> => {
  let username = rsrc.getUsernameFromMember(member);
  let memberDir = rsrc.getMemberDirectoryFromGuild(member.guild, username);
  let guildDir = rsrc.getGuildDirectoryFromGuild(member.guild);

  let removed: any;
  ncp(memberDir, (removed = path.join(guildDir, client.config.files.removed, username)), { clobber: true }, (err): boolean => {
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
