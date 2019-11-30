import { Client, GuildMember, Message, TextChannel } from "discord.js";

import { CommandType } from "../@interfaces/@commands";
import { GuildElevationTypes } from "../@interfaces/@guild_config";

const properties: CommandType["properties"] = {
  elevation: GuildElevationTypes.moderator,
  description: "bans a member from the server",
  usage: "<@member> <?reason>",
  aliases: null
};

const run: CommandType["run"] = async (client: Client, message: Message, args: any): Promise<boolean> => {
  if (message.mentions?.members?.size === 0) {
    await message.reply("please mention a member to kick");
    return false;
  }

  const banMember = message.mentions.members.first() as GuildMember;

  if (!banMember.bannable) {
    await message.reply("I can't ban this member");
    return false;
  }

  await banMember.ban({ reason: args.join(" ") });

  let modChannel = client.getGuildConfig(message.guild).channels.mod_logs;
  await (message.guild.channels.get(modChannel) as TextChannel)?.send(`${banMember} was banned by ${message.author.tag} for reason: ${args.join(" ")}`);

  return true;
};

module.exports.run = run;
module.exports.properties = properties;
