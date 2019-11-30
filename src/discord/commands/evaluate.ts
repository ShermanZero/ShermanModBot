import { Client, Message } from "discord.js";
import { ElevationTypes, CommandType } from "../@interfaces/@commands";

const properties: CommandType["properties"] = {
  elevation: ElevationTypes.administrator,
  description: "runs a line of javascript",
  usage: "<javascript>",
  aliases: ["eval"]
};

const run: CommandType["run"] = async (client: Client, message: Message, ...args: any[]): Promise<boolean> => {
  if (args.length === 0) {
    await message.reply("you must specify javascript code to run");
    return false;
  }

  try {
    const code: string = args.join(" ");
    let evaled = eval(code);

    if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

    await message.channel.send(clean(evaled), { code: "x1" });
  } catch (err) {
    await message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
  }

  return true;
};

function clean(text: any): string {
  if (typeof text === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else return text;
}

module.exports.run = run;
module.exports.properties = properties;
