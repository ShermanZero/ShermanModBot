import { Client, Message } from "discord.js";

import rsrc from "../discord-resources";
import { CommandType } from "../@interfaces/@commands";
import { GuildElevationTypes } from "../@interfaces/@guild_config";

const properties: CommandType["properties"] = {
  elevation: GuildElevationTypes.moderator,
  description: "displays all members registered in the server"
};

const run: CommandType["run"] = async (client: Client, message: Message, ...args: any[]): Promise<boolean> => {
  let guildMembers = rsrc.getGuildMembersFromGuild(client, message.guild);
  let allMembers = Object.keys(guildMembers);

  message.reply(`here are the current registered members of the server:\n[**${allMembers.join("**, **")}**]`);

  return true;
};

module.exports.run = run;
module.exports.properties = properties;
