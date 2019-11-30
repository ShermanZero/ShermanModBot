import { Client, Message, MessageEmbed } from "discord.js";
import { CommandType, ElevationTypes } from "../@interfaces/@commands";
import { DiscordSecrets } from "../secrets/discord-secrets";

const props: CommandType["properties"] = {
  elevation: ElevationTypes.everyone,
  description: "replies to the member with the commands for the server",
  usage: "<?command>"
};

const run: CommandType["function"] = async (client: Client, message: Message, ...args: any[]): Promise<boolean> => {
  const embed = new MessageEmbed();

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

module.exports.run = run;
module.exports.props = props;
