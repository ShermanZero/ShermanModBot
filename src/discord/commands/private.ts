import { Client, Message, Role, TextChannel } from "discord.js";
import { DiscordConfig } from "../../shared/configs/discord_config";

let discordConfig: DiscordConfig;

module.exports.props = {
  requiresElevation: discordConfig.elevation_names.moderator,
  description: "grants a member access to the private-hangout channel",
  usage: "<member>"
};

module.exports.run = async (client: Client, message: Message, args: string[]): Promise<boolean> => {
  if (!message.guild) return false;

  let privateRole: Role = message.guild.roles.get("645418484398030918");
  let privateHangoutChannel: TextChannel = message.guild.channels.get("645418390961258536") as TextChannel;

  if (message.mentions?.members?.size === 0) {
    await message.reply("please mention a member to give private access to");
    return false;
  }

  const roleMember = message.mentions.members.first();

  //add the private role to the member
  await roleMember?.roles.add(privateRole);

  //delete the original message
  await message.delete();

  //alert the member that they are in the channel
  await privateHangoutChannel.send(`${roleMember}, welcome to the private channel!  All the messages will be deleted after you have left.`);
  await privateHangoutChannel.awaitMessages((response: Message) => response.content.endsWith("EOD"), {
    max: 1,
    time: 600000,
    errors: ["time"]
  });

  await privateHangoutChannel.send("The private discussion has concluded, use !purge to clear the channel.");
  await roleMember?.roles.remove(privateRole);

  return true;
};
