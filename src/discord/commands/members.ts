import { Client, Message } from "discord.js";

import rsrc from "../../shared/resources/resources";
import { DiscordConfig } from "../../shared/configs/discord_config";

let discordConfig: DiscordConfig;

module.exports.props = {
  requiresElevation: discordConfig.elevation_names.moderator,
  description: "displays all members registered in the server"
};

module.exports.run = async (client: Client, message: Message, args: string[]): Promise<boolean> => {
  let guildMembers = rsrc.getGuildMembersFromGuild(client, message.guild);
  let allMembers = Object.keys(guildMembers);

  message.reply(`here are the current registered members of the server:\n[**${allMembers.join("**, **")}**]`);

  return true;
};
