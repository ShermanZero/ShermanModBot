import 'colors';

import { GuildMember } from 'discord.js';
import * as ncp from 'ncp';
import * as path from 'path';

import rsrc from '../classes/Resources';

export default (client: any, member: GuildMember) => {
  let username = rsrc.getUsernameFromMember(member);
  let userDir = rsrc.getUserDirectoryFromGuild(member.guild, username);
  let guildDir = rsrc.getGuildDirectoryFromGuild(member.guild);

  let removed: any;
  ncp(
    userDir,
    (removed = path.join(guildDir, client.config.files.removed, username)),
    { clobber: true },
    err => {
      if (err)
        return console.error(
          `!! Failed to transfer [${username}] to ${removed}`
        );

      console.log(
        `Member [${username.magenta}] just left the guild [${
          rsrc.getGuildNameFromGuild(member.guild).magenta
        }]`
      );
    }
  );

  client.deleteUser(member.guild, username);
};
