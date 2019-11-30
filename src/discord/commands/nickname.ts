import { Client, Message } from "discord.js";
import { CommandType, ElevationTypes } from "../@interfaces/@commands";

const props: CommandType["properties"] = {
  elevation: ElevationTypes.moderator,
  description: "changes the nickname of a user",
  usage: "<@member | username> <nickname>",
  aliases: ["nick"]
};

const run: CommandType["run"] = async (client: Client, message: Message, ...args: any[]): Promise<boolean> => {
  if (message.mentions?.members?.size === 0) {
    await message.reply("please mention a member to change their nickname");
    return false;
  }

  const nickMember = message.mentions.members.first();
  nickMember!.setNickname(args[1]);

  await message.reply(`${nickMember}'s nickname has been changed!`);

  return true;
};

module.exports.run = run;
module.exports.props = props;
