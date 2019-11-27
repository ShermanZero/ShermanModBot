import { Message } from 'discord.js';

import config from '../resources/global_config';

module.exports.props = {
  requiresElevation: config.elevation_names.moderator,
  description: "changes the nickname of a member",
  usage: "<member> <nickname>"
};

module.exports.run = async (client: any, message: Message, args: string[]) => {
  if (!message.mentions.members || message.mentions.members.array.length === 0)
    return message.reply("please mention a member to change their nickname").catch(err => {
      console.log(err);
    });

  const nickMember = message.mentions.members.first();
  nickMember!.setNickname(args[1]);

  await message.reply(`${nickMember}'s nickname has been changed!`).catch(err => {
    console.log(err);
  });
};
