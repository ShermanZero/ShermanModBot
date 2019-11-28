import { Message } from 'discord.js';

module.exports.props = {
  description: "makes the bot say your message",
  usage: "<message>"
};

module.exports.run = async (client: any, message: Message, args: string[]) => {
  const sayMessage = args.join(" ");

  await message.delete();
  await message.channel.send(sayMessage);
};
