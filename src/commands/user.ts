import { Message } from 'discord.js';

import config from '../resources/global_config';
import rsrc from '../resources/resources';

module.exports.props = {
  requiresElevation: config.elevation_names.moderator,
  description: "displays the member's data",
  usage: "<member>"
};

module.exports.run = async (client: any, message: Message, args: string[]) => {
  const user = message.mentions.users.first();

  let username: string;
  let userContent: any;

  if (!user) {
    if (args.length == 1) {
      userContent = rsrc.getUserContentsFromName(client, message, args[0], true);

      if (!userContent) {
        return message.reply("that user is not registered");
      } else {
        username = userContent?.hidden?.username;
      }
    } else {
      return message.reply("you need to specify a user");
    }
  } else {
    username = rsrc.getUsernameFromMember(user);
    userContent = client.getUserContent(message.guild, username);
  }

  if (!username || !userContent) return message.reply("that user is not registered");

  userContent = client.hideUserInfo(userContent);

  await message.delete();
  await message.channel.send(`Here is the data for [${username.hideID()}]\n\`\`\`json\n${JSON.stringify(userContent, null, "\t")}\n\`\`\``);
};
