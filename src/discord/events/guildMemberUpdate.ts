import { GuildMember } from "discord.js";
import { Client } from "discord.js";

module.exports = async (client: Client, oldMember: GuildMember, newMember: GuildMember): Promise<boolean> => {
  return true;
};
