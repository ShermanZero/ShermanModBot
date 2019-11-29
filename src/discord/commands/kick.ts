import { Client, Message } from "discord.js";
import { CommandType, ElevationTypes } from "../types/@commands";

class Kick implements CommandType {
  props: {
    requiresElevation?: ElevationTypes.moderator;
    description: "kicks a member from the server";
    usage?: "<member> <?reason>";
  };

  async run(client: Client, message: Message, ...args: any[]) {
    if (message.mentions?.members?.size === 0) {
      await message.reply("please mention a member to kick");
      return false;
    }

    const kickMember = message.mentions.members.first();

    await kickMember!.kick(args.join(" "));

    let modChannel = client.getGuildConfig(message.guild);
    await modChannel.send(`${kickMember} was kicked by ${message.author.tag} for reason: ${args.join(" ")}`);

    return true;
  }

  getEmbed?(...args: any[]): import("discord.js").MessageEmbed {
    throw new Error("Method not implemented.");
  }
}

module.exports = Kick;
