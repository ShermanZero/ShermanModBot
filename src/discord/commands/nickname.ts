import { Client, Message } from "discord.js";
import { CommandType, ElevationTypes } from "../types/@commands";

class Nickname implements CommandType {
  props: {
    requiresElevation?: ElevationTypes.moderator;
    description: "changes the nickname of a user";
    usage?: "<@member | username> <nickname>";
    aliases?: ["nick"];
  };

  async run(client: Client, message: Message, ...args: any[]): Promise<boolean> {
    if (message.mentions?.members?.size === 0) {
      await message.reply("please mention a member to change their nickname");
      return false;
    }

    const nickMember = message.mentions.members.first();
    nickMember!.setNickname(args[1]);

    await message.reply(`${nickMember}'s nickname has been changed!`);

    return true;
  }

  getEmbed?(...args: any[]): import("discord.js").MessageEmbed {
    throw new Error("Method not implemented.");
  }
}

module.exports = Nickname;
