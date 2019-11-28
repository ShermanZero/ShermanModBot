import { GuildMember, Message } from 'discord.js';

import config from '../resources/global_config';

module.exports.props = {
  requiresElevation: config.elevation_names.moderator,
  description: "bans a member from the server",
  usage: "<member> <?reason>"
};

module.exports.run = async (client: any, message: Message, [mention, ...reason]) => {
  if (!message.mentions.members || message.mentions.members.array.length === 0) return await message.reply("please mention a user to kick");

  const banMember = message.mentions.members.first() as GuildMember;
  await banMember.ban({ reason: reason.join(" ") });

  let modChannel = client.channels.get(client.config.channels.mod.logs);
  await modChannel.send(`${banMember.user.username} was banned by ${message.author.tag} for reason: ${reason}`);
};
