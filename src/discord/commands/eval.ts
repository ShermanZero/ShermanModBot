import { Client, Message } from "discord.js";

module.exports.props = {
  requiresElevation: DiscordConfig.elevation_names.moderator,
  description: "runs a line of javascript",
  usage: "<javascript>"
};

module.exports.run = async (client: Client, message: Message, args: string[]): Promise<boolean> => {
  try {
    const code: string = args.join(" ");
    let evaled = eval(code);

    if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

    message.channel.send(clean(evaled), { code: "x1" });
  } catch (err) {
    message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
  }

  return true;
};

function clean(text: any): string {
  if (typeof text === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else return text;
}
