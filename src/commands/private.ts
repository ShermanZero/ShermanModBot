import { Channel, Message, Role } from "discord.js";

import config from "../resources/global_config";

module.exports.props = {
  requiresElevation: config.elevation_names.moderator,
  description: "grants a member access to the private-hangout channel",
  usage: "<member>"
};

module.exports.run = async (client: any, message: Message, args: string[]) => {
  if (!message.guild) return;

  let privateRole = message.guild.roles.get("645418484398030918");
  let privateHangoutChannel: any = client.channels("645418390961258536");

  if (privateRole) privateRole = privateRole as Role;
  if (privateHangoutChannel) privateHangoutChannel = privateHangoutChannel as Channel;

  if (!message.mentions.members || message.mentions.members.array.length === 0) return message.reply("please mention a user to give private access to");

  const roleMember = message.mentions.members.first();

  //add the private role to the member
  await roleMember?.roles.add(privateRole);

  //delete the original message
  await message.delete();

  //alert the member that they are in the channel
  await privateHangoutChannel.send(`${roleMember}, welcome to the private channel!  All the messages will be deleted after you have left.`);

  await privateHangoutChannel.awaitMessages((response: Message) => response.content === "EOD", {
    max: 1,
    time: 600000,
    errors: ["time"]
  });

  await privateHangoutChannel.send("The private discussion has concluded, use !purge to clear the channel.");

  await roleMember?.roles.remove(privateRole);
};
