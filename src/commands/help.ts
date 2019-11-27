import { Message, MessageEmbed } from 'discord.js';

import rsrc from '../classes/Resources';

module.exports.props = {
  description: "replies to the member with the commands for the server"
};

module.exports.run = async (client: any, message: Message) => {
  const embed = new MessageEmbed();

  if (!message.guild) return;

  embed.setTitle(`${message.guild.name} Commands`);
  embed.setDescription("All the commands **you** have access to in this server");
  embed.setColor(0x00ae86);

  let guildConfig = client.guild_configs[rsrc.getGuildNameFromGuild(message.guild)];

  client.commands.forEach((value: any, key: string) => {
    if (!value.props || !message.member) return;

    let elevatedPermissions = value.props.requiresElevation && message.member.roles.find(guildConfig.roles[value.props.requiresElevation]) !== null;
    let noPermissions = !value.props.requiresElevation || value.props.requiresElevation === "";

    if (message.member.user.id === client.global_config.botowner) elevatedPermissions = true;

    if (elevatedPermissions || noPermissions) {
      var header = "**!" + key + "**";

      let desc = value.props.description;
      if (value.props.usage) header += `\n\t*!${key} ${value.props.usage}*`;

      if (elevatedPermissions && !noPermissions) desc += `  \`\`\`css\n[${value.props.requiresElevation}]\`\`\``;

      embed.addField(header, desc, true);
    }
  });

  message.channel.send(embed).catch(err => {
    console.log(err);
  });
};
