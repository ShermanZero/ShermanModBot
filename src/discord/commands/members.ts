import { Client, Message } from "discord.js";

import rsrc from "../discord-resources";
import { CommandType, ElevationTypes } from "../@interfaces/@commands";

const props: CommandType["properties"] = {
  elevation: ElevationTypes.moderator,
  description: "displays all members registered in the server"
};

const run: CommandType["run"] = async (client: Client, message: Message, ...args: any[]): Promise<boolean> => {
  let guildMembers = rsrc.getGuildMembersFromGuild(client, message.guild);
  let allMembers = Object.keys(guildMembers);

  message.reply(`here are the current registered members of the server:\n[**${allMembers.join("**, **")}**]`);

  return true;
};

module.exports.run = run;
module.exports.props = props;
