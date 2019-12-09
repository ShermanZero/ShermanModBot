import { Client, Message, MessageEmbed } from "discord.js";
import { CommandType } from "../@utilities/@commands";
import { GuildElevationTypes } from "../@utilities/@guild_config";

const properties: CommandType["properties"] = {
  elevation: GuildElevationTypes.everyone,
  description: "replies to the member with the commands for the server",
  usage: "<?command>"
};

const run: CommandType["run"] = async (client: Client, message: Message, args: string[]): Promise<boolean> => {
  const embed = new MessageEmbed();

  embed.setTitle(`${message.guild.name} Commands`);
  embed.setDescription("All the commands in this server");
  embed.setColor(0x00ae86);

  client.commands.forEach((command: CommandType, commandName: string) => {
    if (!command.properties || !message.member) return;
    if (command.properties.elevation == GuildElevationTypes.botowner) return;

    let header = "**!" + commandName + "**";

    let desc = command.properties.description;
    if (command.properties.usage) header += `\n\t*!${commandName} ${command.properties.usage}*`;

    desc += `  \`\`\`css\n[${command.properties.elevation}]\`\`\``;

    embed.addField(header, desc, true);
  });

  await message.channel.send(embed);

  return true;
};

module.exports.run = run;
module.exports.properties = properties;
