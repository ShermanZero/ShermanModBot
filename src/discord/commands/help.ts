import { Client, Message, MessageEmbed } from "discord.js";

module.exports.props = {
  description: "replies to the member with the commands for the server"
};

module.exports.run = async (client: Client, message: Message): Promise<boolean> => {
  const embed = new MessageEmbed();

  if (!message.guild) return false;

  embed.setTitle(`${message.guild.name} Commands`);
  embed.setDescription("All the commands **you** have access to in this server");
  embed.setColor(0x00ae86);

  let guildConfig = client.getGuildConfig(message.guild);

  client.commands.forEach((value: any, key: string) => {
    if (!value.props || !message.member) return;

    let elevatedPermissions = value.props.requiresElevation && message.member.roles.get(guildConfig.roles[value.props.requiresElevation]) !== null;
    let noPermissions = !value.props.requiresElevation || value.props.requiresElevation === "";

    if (message.member.user.id === DiscordSecrets.botowner) elevatedPermissions = true;

    if (elevatedPermissions || noPermissions) {
      let header = "**!" + key + "**";

      let desc = value.props.description;
      if (value.props.usage) header += `\n\t*!${key} ${value.props.usage}*`;

      if (elevatedPermissions && !noPermissions) desc += `  \`\`\`css\n[${value.props.requiresElevation}]\`\`\``;

      embed.addField(header, desc, true);
    }
  });

  await message.channel.send(embed);

  return true;
};
