import { Client, GuildMember, Message, TextChannel } from "discord.js";
import { DiscordConfig } from "../../shared/configs/discord_config";

let discordConfig: DiscordConfig;

module.exports.props = {
  requiresElevation: discordConfig.elevation_names.moderator,
  description: "bans a member from the server",
  usage: "<member> <?reason>"
};

module.exports.run = async (client: Client, message: Message, ...reason: string[]): Promise<boolean> => {
  if (message.mentions?.members?.size === 0) {
    await message.reply("please mention a member to kick");
    return false;
  }

  const banMember = message.mentions.members.first() as GuildMember;
  await banMember.ban({ reason: reason.join(" ") });

  let modChannel = client.getGuildConfig(message.guild).channels.mod_logs;
  await (modChannel as TextChannel).send(`${banMember.user.username} was banned by ${message.author.tag} for reason: ${reason.join(" ")}`);

  return true;
};
