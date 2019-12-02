import { GuildMember, TextChannel } from "discord.js";

import rsrc from "../resources";
import { Client } from "discord.js";

module.exports = async (client: Client, member: GuildMember): Promise<boolean> => {
  const guild = member.guild;

  let guildConfig = client.getGuildConfig(member.guild);

  const defaultChannel = guild.channels.get(guildConfig.channels.default);
  if (!(defaultChannel as TextChannel)) return false;

  let unrankedRole = guild.roles.get("609248072706424863");
  await member.roles.add(unrankedRole);

  let serverRules = guild.channels.get(guildConfig.channels.server_rules);
  let serverInfo = guild.channels.get(guildConfig.channels.server_info);
  let autoRoles = guild.channels.get(guildConfig.channels["auto-roles"]);

  await (defaultChannel as TextChannel)!.send(
    `Welcome ${member.user} to **${guild.name}**!  You are member **#${guild.memberCount}**!  Check out the ${serverRules} and ${serverInfo} regarding the different channels.  **Please change your nickname to match your Twitch account name, and link your Twitch and Discord together.**  Be sure to assign yourself some roles over in ${autoRoles}, based on what you want to see!  Get to know everyone, have a great time, and thanks for joining!`
  );

  rsrc.createMemberDirectory(client, member.guild, member);

  return true;
};
