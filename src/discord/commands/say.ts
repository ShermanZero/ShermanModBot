import { Client, Message } from 'discord.js';

module.exports.props = {
  description: "makes the bot say your message",
  usage: "<message>"
};

module.exports.run = async (client: Client, message: Message, args: string[]): Promise<any> => {
  const sayMessage = args.join(" ");

  await message.delete();
  await message.channel.send(sayMessage);

  return true;
};
