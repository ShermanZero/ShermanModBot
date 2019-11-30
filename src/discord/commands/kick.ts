import { Client, Message, TextChannel } from "discord.js";
import { CommandType, ElevationTypes } from "../@interfaces/@commands";

const props: CommandType["properties"] = {
  elevation: ElevationTypes.moderator,
  description: "kicks a member from the server",
  usage: "<member> <?reason>"
};

const run: CommandType["run"] = async (client: Client, message: Message, ...args: any[]) => {
  if (message.mentions?.members?.size === 0) {
    await message.reply("please mention a member to kick");
    return false;
  }

  const kickMember = message.mentions.members.first();

  await kickMember!.kick(args.join(" "));

  let modChannel = client.getGuildConfig(message.guild).channels.mod_logs;
  await (message.guild.channels.get(modChannel) as TextChannel)?.send(`${kickMember} was kicked by ${message.author.tag} for reason: ${args.join(" ")}`);

  return true;
};

module.exports.run = run;
module.exports.props = props;
