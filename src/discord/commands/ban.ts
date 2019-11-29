import { Client, GuildMember, Message, TextChannel } from "discord.js";
import { CommandType, ElevationTypes } from "../types/@commands";

class Ban implements CommandType {
  props: {
    requiresElevation?: ElevationTypes.moderator;
    description: "bans a member from the server";
    usage?: "<member> <?reason>";
  };

  async run(client: Client, message: Message, ...args: any[]) {
    if (message.mentions?.members?.size === 0) {
      await message.reply("please mention a member to kick");
      return false;
    }

    const banMember = message.mentions.members.first() as GuildMember;
    await banMember.ban({ reason: args.join(" ") });

    let modChannel = client.getGuildConfig(message.guild).channels.mod_logs;
    await (modChannel as TextChannel).send(`${banMember.user.username} was banned by ${message.author.tag} for reason: ${args.join(" ")}`);

    return true;
  }

  getEmbed(...args: any[]): import("discord.js").MessageEmbed {
    throw new Error("Method not implemented.");
  }
}

module.exports = Ban;
