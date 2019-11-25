import '../classes/StringHandler';

import { Message } from 'discord.js';

import rsrc from '../classes/Resources';

exports.props = {
  "requiresElevation": "mod",
  "description": "displays all users registered in the server",
  "usage": ""
};

exports.run = (client: any, message: Message, args: string[]) => {
  let guildUsers = rsrc.getGuildUsersFromGuild(message.guild);
  let allUsers = Object.keys(guildUsers);

  message.reply(`here are the current registered users of the server:\n[**${allUsers.join("**, **")}**]`);
}
