import { Client, GuildMember, Message, TextChannel } from "discord.js";

import { CommandType } from "../@interfaces/@commands";

const run: CommandType["function"] = async (client: Client, message: Message, ...args: any[]): Promise<boolean> => {
  if (message.mentions?.members?.size === 0) {
    await message.reply("please mention a member to kick");
    return false;
  }

  const banMember = message.mentions.members.first() as GuildMember;
  await banMember.ban({ reason: args.join(" ") });

  let modChannel = client.getGuildConfig(message.guild).channels.mod_logs;
  await (message.guild.channels.get(modChannel) as TextChannel)?.send(`${banMember} was banned by ${message.author.tag} for reason: ${args.join(" ")}`);

  return true;
};

const props: CommandType["properties"] = {
  elevation: true,
  description: "",
  usage: "",
  aliases: null
};

module.exports.run = run;
module.exports.props = props;
