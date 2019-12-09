import { Client, GuildMember, Message } from "discord.js";

import { CommandType } from "../@utilities/@commands";
import { GuildElevationTypes } from "../@utilities/@guild_config";
import { MemberConfigType } from "../@utilities/@member_config";
import rsrc from "../resources";

const properties: CommandType["properties"] = {
  elevation: GuildElevationTypes.guildowner,
  description: "assigns a new level to a member",
  usage: "<@member | member> <level>"
};

const run: CommandType["run"] = async (client: Client, message: Message, args: string[]): Promise<boolean> => {
  let member: GuildMember = message.mentions?.members?.first();
  let memberConfig: MemberConfigType;

  if (args.length < 1) {
    await message.reply("you need to specify a member!");
    return false;
  }

  let username: string = args[0];

  if (args.length < 2) {
    await message.reply("you need to specify a new level!");
    return false;
  }

  let level: number = parseInt(args[1]);

  if (!member) {
    memberConfig = await rsrc.getMemberConfigFromName(client, message, username, true);
  } else {
    memberConfig = client.getMemberConfig(message.guild, rsrc.getUsernameFromMember(member));
  }

  memberConfig.rank.level = level;
  memberConfig.rank.xp = rsrc.getXPOfLevel(level);
  memberConfig.rank.levelup = rsrc.getXPOfLevel(level + 1);
  memberConfig.rank.rankup = level + (5 - (level % 5));

  rsrc.assignNewRank(client, message.guild, memberConfig);

  await message.delete();
  await message.reply(`**${memberConfig.hidden.username.hideID()}** is now level **${level}**!`);
  return true;
};

module.exports.run = run;
module.exports.properties = properties;
