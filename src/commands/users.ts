import { Message } from 'discord.js';

import config from '../resources/global_config';
import rsrc from '../resources/resources';

module.exports.props = {
  requiresElevation: config.elevation_names.moderator,
  description: "displays all members registered in the server"
};

module.exports.run = async (client: any, message: Message, args: string[]) => {
  let guildUsers = rsrc.getGuildUsersFromGuild(client, message.guild);
  let allUsers = Object.keys(guildUsers);

  message.reply(`here are the current registered members of the server:\n[**${allUsers.join("**, **")}**]`);
};
