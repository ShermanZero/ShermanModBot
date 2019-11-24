import '../classes/StringHandler';

import rsrc from '../classes/Resources';

exports.props = {
  "requiresElevation": "mod",
  "description": "displays all users registered in the server",
  "usage": ""
};

exports.run = (client, message, args) => {
  let guildUsers = rsrc.getGuildUsersFromGuild(message.guild);
  let allUsers = Object.keys(guildUsers);

  message.reply(`here are the current registered users of the server:\n[**${allUsers.join("**, **")}**]`);
}
