import { Client, Message, MessageEmbed } from "discord.js";
import { CommandType } from "../@interfaces/@commands";
import { DiscordSecrets } from "../secrets/discord-secrets";
import { GuildElevationTypes } from "../@interfaces/@guild_config";

const properties: CommandType["properties"] = {
  elevation: GuildElevationTypes.everyone,
  description: "replies to the member with the commands for the server",
  usage: "<?command>"
};

const run: CommandType["run"] = async (client: Client, message: Message, ...args: any[]): Promise<boolean> => {
  const embed = new MessageEmbed();

  embed.setTitle(`${message.guild.name} Commands`);
  embed.setDescription("All the commands **you** have access to in this server");
  embed.setColor(0x00ae86);

  let guildConfig = client.getGuildConfig(message.guild);

  client.commands.forEach((value: any, key: string) => {
    if (!value.properties || !message.member) return;

    let elevatedPermissions = value.properties.requiresElevation && message.member.roles.get(guildConfig.roles[value.properties.requiresElevation]) !== null;
    let noPermissions = !value.properties.requiresElevation || value.properties.requiresElevation === "";

    if (message.member.user.id === DiscordSecrets.botowner) elevatedPermissions = true;

    if (elevatedPermissions || noPermissions) {
      let header = "**!" + key + "**";

      let desc = value.properties.description;
      if (value.properties.usage) header += `\n\t*!${key} ${value.properties.usage}*`;

      if (elevatedPermissions && !noPermissions) desc += `  \`\`\`css\n[${value.properties.requiresElevation}]\`\`\``;

      embed.addField(header, desc, true);
    }
  });

  await message.channel.send(embed);

  return true;
};

module.exports.run = run;
module.exports.properties = properties;
