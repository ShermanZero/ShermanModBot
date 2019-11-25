import { Message } from 'discord.js';

exports.props = {
  "requiresElevation": "mod",
  "description": "kicks a member from the server",
  "usage": "{user} {reason}"
};

exports.run = (client: any, message: Message, [mention, ...reason]) => {
  if(message.mentions.members.size === 0)
    return message.reply("please mention a user to kick");

  const kickMember = message.mentions.members.first();
  kickMember.kick(reason.join(" ")).then(member => {
    let modChannel = client.channels.get(client.config.channels.mod.logs);

    modChannel.send(`${member.user.username} was kicked by ${message.author.tag} for reason: ${reason}`).catch((err) => {console.log(err)});
  });
};
