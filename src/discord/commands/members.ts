import { Client, Message } from "discord.js";

import rsrc from "../discord-resources";
import { CommandType, ElevationTypes } from "../@interfaces/@commands";

class Members implements CommandType {
  props = {
    requiresElevation: ElevationTypes.moderator,
    description: "displays all members registered in the server"
  };

  async run(client: Client, message: Message, ...args: any[]): Promise<boolean> {
    let guildMembers = rsrc.getGuildMembersFromGuild(client, message.guild);
    let allMembers = Object.keys(guildMembers);

    message.reply(`here are the current registered members of the server:\n[**${allMembers.join("**, **")}**]`);

    return true;
  }

  getEmbed?(...args: any[]): import("discord.js").MessageEmbed {
    throw new Error("Method not implemented.");
  }
}

module.exports = Members;
