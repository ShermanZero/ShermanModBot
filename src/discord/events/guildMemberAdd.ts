import { Client, Guild, GuildMember, TextChannel } from 'discord.js';

import { Variables } from '../@utilities/@custom_variables';
import rsrc from '../resources';

module.exports = async (client: Client, member: GuildMember): Promise<boolean> => {
  const guild = member.guild;

  let guildConfig = client.getGuildConfig(member.guild);

  let unrankedRole = guild.roles.get("609248072706424863");
  await member.roles.add(unrankedRole);

  rsrc.createMemberDirectory(client, member.guild, member);

  let welcomeMessage = guildConfig.message_formats.welcome;
  if (!welcomeMessage) return true;

  while (welcomeMessage.includes("${")) {
    let startIndex = welcomeMessage.indexOf("${");
    let endIndex = welcomeMessage.indexOf("}") + 1;
    let command = welcomeMessage.substring(startIndex, endIndex);

    let replace: string;
    let commandType = Variables.Default.getValueType(command);
    if (commandType === Guild) replace = Variables.Default.getValue(command, member.guild);
    if (commandType === GuildMember) replace = Variables.Default.getValue(command, member);

    welcomeMessage = welcomeMessage.replace(command, replace);
  }

  const defaultChannel = guild.channels.get(guildConfig.channels.default);
  if (!(defaultChannel as TextChannel)) return false;

  await (defaultChannel as TextChannel)!.send(welcomeMessage);
  return true;
};
