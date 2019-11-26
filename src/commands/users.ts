import '../classes/StringHandler';

import { Message } from 'discord.js';

import rsrc from '../classes/Resources';

export default class users {
  props = {
    requiresElevation: "mod",
    description: "displays all members registered in the server",
  };

  async run(client: any, message: Message, args: string[]) {
    let guildUsers = rsrc.getGuildUsersFromGuild(message.guild);
    let allUsers = Object.keys(guildUsers);

    message.reply(
      `here are the current registered members of the server:\n[**${allUsers.join(
        "**, **"
      )}**]`
    );
  }
}
