import { Client, Message } from "discord.js";
import { DiscordConfig } from "../../shared/configs/discord_config";

let discordConfig: DiscordConfig;

module.exports.props = {
  requiresElevation: discordConfig.elevation_names.moderator,
  description: "kicks a member from the server",
  usage: "<member> <?reason>"
};

module.exports.run = async (client: Client, message: Message, ...reason: string[]): Promise<boolean> => {
  if (message.mentions?.members?.size === 0) {
    await message.reply("please mention a member to kick");
    return false;
  }

  const kickMember = message.mentions.members.first();

  await kickMember!.kick(reason.join(" "));

  let modChannel = client.getGuildConfig(message.guild);
  await modChannel.send(`${kickMember} was kicked by ${message.author.tag} for reason: ${reason.join(" ")}`);

  return true;
};
