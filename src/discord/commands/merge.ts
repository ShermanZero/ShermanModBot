import { Client, Guild, Message } from "discord.js";
import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";

import rsrc from "../discord-resources";
import { CommandType } from "../@interfaces/@commands";
import { GuildElevationTypes } from "../@interfaces/@guild_config";

const properties: CommandType["properties"] = {
  elevation: GuildElevationTypes.botowner,
  description: "merges a member's data into a new member",
  usage: "<old username> <new username>"
};

const run: CommandType["run"] = async (client: Client, message: Message, args: any): Promise<boolean> => {
  if (args.length != 2) await message.reply("you need to specify two members, use !members to get the current members");

  //the member to copy from
  const oldMember = args[0].trim().toLowerCase();
  //the member to copy to
  const newMember = args[1].trim().toLowerCase();

  let oldUsername = rsrc.getUsernameFromMember(oldMember);
  let newUsername = rsrc.getUsernameFromMember(newMember);

  if (!client.hasMember(message.guild, oldUsername))
    if (message) {
      await message.reply(`I could not find OLD [${oldMember}] in my database`);
      return false;
    } else {
      `I could not find OLD [${oldMember}] in my database`.error();
      return false;
    }

  if (!client.hasMember(message.guild, newUsername))
    if (message) {
      await message.reply(`I could not find NEW [${newMember}] in my database`);
      return false;
    } else {
      `I could not find NEW [${newMember}] in my database`.error();
      return false;
    }

  let memberConfig = client.getMemberConfig(message.guild, oldUsername);
  memberConfig.hidden.username = newUsername;

  let source = rsrc.getMemberDirectoryFromGuild(message.guild as Guild, oldUsername);
  let destination = rsrc.getMemberDirectoryFromGuild(message.guild as Guild, newUsername);

  fs.writeFileSync(path.join(destination, newUsername + ".json"), JSON.stringify(memberConfig, null, "\t"));
  rimraf(source, (err: Error) => {
    if (err) err.stack.error();
  });

  client.membersInSession.delete(oldMember);
  `*Removed [${oldMember}] from session`.warning(true);

  if (message) await message.delete();

  return true;
};

module.exports.run = run;
module.exports.properties = properties;
