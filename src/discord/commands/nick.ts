import { Client, Message } from "discord.js";
import { DiscordConfig } from "../../shared/configs/discord_config";

let discordConfig: DiscordConfig;

module.exports.props = {
  requiresElevation: discordConfig.elevation_names.moderator,
  description: "changes the nickname of a member",
  usage: "<member> <nickname>"
};

module.exports.run = async (client: Client, message: Message, args: string[]): Promise<boolean> => {
  if (message.mentions?.members?.size === 0) {
    await message.reply("please mention a member to change their nickname");
    return false;
  }

  const nickMember = message.mentions.members.first();
  nickMember!.setNickname(args[1]);

  await message.reply(`${nickMember}'s nickname has been changed!`);

  return true;
};
