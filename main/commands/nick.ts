import { Message } from 'discord.js';

exports.props = {
  requiresElevation: "mod",
  description: "changes the nickname of a member",
  usage: "{user} {nickname}"
};

exports.run = (client: any, message: Message, args: string[]) => {
  if (message.mentions.members.size === 0)
    return message
      .reply("please mention a user to change their nickname")
      .catch(err => {
        console.log(err);
      });

  const nickMember = message.mentions.members.first();
  nickMember.setNickname(args[1]);

  message.reply(`${nickMember}'s nickname has been changed!`).catch(err => {
    console.log(err);
  });
};
