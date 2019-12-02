import { Client, Message, TextChannel } from "discord.js";
import { CommandType } from "../@interfaces/@commands";
import { GuildElevationTypes } from "../@interfaces/@guild_config";

const properties: CommandType["properties"] = {
  elevation: GuildElevationTypes.moderator,
  description: "kicks a member from the server",
  usage: "<@member> <?reason>"
};

const run: CommandType["run"] = async (client: Client, message: Message, args: string[]) => {
  if (message.mentions?.members?.size === 0) {
    await message.reply("please mention a member to kick");
    return false;
  }

  const kickMember = message.mentions.members.first();

  if (!kickMember.kickable) {
    await message.reply("I can't kick this member");
    return false;
  }

  await kickMember!.kick(args.join(" "));

  let modChannel = client.getGuildConfig(message.guild).channels.mod_logs;
  await (message.guild.channels.get(modChannel) as TextChannel)?.send(`${kickMember} was kicked by ${message.author} for reason: ${args?.slice(1)?.join(" ")}`);

  return true;
};

module.exports.run = run;
module.exports.properties = properties;
