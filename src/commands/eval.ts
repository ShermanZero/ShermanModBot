import { Message } from 'discord.js';

export default class evaluate {
  props = {
    requiresElevation: "owner",
    description: "runs a line of javascript",
    usage: "<javascript>"
  };

  async run(client: any, message: Message, args: string[]) {
    try {
      const code: string = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

      message.channel.send(this.clean(evaled), { code: "x1" });
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${this.clean(err)}\n\`\`\``);
    }
  }

  clean(text: any) {
    if (typeof text === "string")
      return text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
    else return text;
  }
}
