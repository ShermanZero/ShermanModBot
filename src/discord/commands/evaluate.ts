import { Client, Message } from "discord.js";
import { ElevationTypes, CommandType } from "../types/@commands";

class Evaluate implements CommandType {
  props: {
    requiresElevation?: ElevationTypes.administrator;
    description: "runs a line of javascript";
    usage?: "<javascript>";
    aliases?: ["eval"];
  };

  async run(client: Client, message: Message, ...args: any[]): Promise<boolean> {
    try {
      const code: string = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), { code: "x1" });
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }

    return true;
  }
}

function clean(text: any): string {
  if (typeof text === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else return text;
}

module.exports = Evaluate;
