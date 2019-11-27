import { GuildMember, TextChannel } from 'discord.js';

import rsrc from '../classes/Resources';

module.exports = (client: any, member: GuildMember) => {
  const guild = member.guild;

  let guildConfig = client.guild_configsp[rsrc.getGuildNameFromGuild(member.guild)];

  const defaultChannel = guild.channels.get(guildConfig.channels.default);

  if (!(defaultChannel as TextChannel)) return;

  let unrankedRole = guild.roles.get("609248072706424863");

  member.roles.add(unrankedRole).catch(err => {
    console.log(err);
  });

  let serverRules = guild.channels.get(client.config.channels.shermanzeros_hangout.server_rules);
  let serverInfo = guild.channels.get(client.config.channels.shermanzeros_hangout.server_information);
  let autoRoles = guild.channels.get(client.config.channels.shermanzeros_hangout.auto_roles);

  (defaultChannel as TextChannel)!
    .send(
      `Welcome ${member.user} to **${guild.name}**!  You are member **#${guild.memberCount}!  Check out the ${serverRules} and ${serverInfo} regarding the different channels.  **Please change your nickname to match your Twitch account name, and link your Twitch and Discord together.**  Be sure to assign yourself some roles over in ${autoRoles}, based on what you want to see!  Get to know everyone, have a great time, and thanks for joining!`
    )
    .catch((err: any) => {
      console.log(err);
    });

  rsrc.createUserDirectory(client, member.guild, member);
};
