import { Message } from 'discord.js';

export default class say {
  props = {
    description: "makes the bot say your message",
    usage: "<message>"
  };

  async run(client: any, message: Message, args: string[]) {
    const sayMessage = args.join(" ");

    message.delete().catch(err => {
      console.log(err);
    });
    message.channel.send(sayMessage).catch(err => {
      console.log(err);
    });
  }
}
