import { Message } from 'discord.js';

export default class nick {
  props = {
    requiresElevation: "mod",
    description: "changes the nickname of a member",
    usage: "<member> <nickname>"
  };

  async run(client: any, message: Message, args: string[]) {
    if (!message.mentions.members || message.mentions.members.size === 0)
      return message
        .reply("please mention a member to change their nickname")
        .catch(err => {
          console.log(err);
        });

    const nickMember = message.mentions.members.first();
    nickMember!.setNickname(args[1]);

    await message.reply(`${nickMember}'s nickname has been changed!`).catch(err => {
      console.log(err);
    });
  }
}
