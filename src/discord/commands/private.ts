import { Client, Message, Role, TextChannel } from "discord.js";
import { CommandType } from "../@utilities/@commands";
import { GuildElevationTypes } from "../@utilities/@guild_config";
import rsrc from "../resources";

const properties: CommandType["properties"] = {
  elevation: GuildElevationTypes.moderator,
  description: "grants a member access to the private-hangout channel",
  usage: "<@member>",
  aliases: ["priv"]
};

const run: CommandType["run"] = async (client: Client, message: Message, args: string[]): Promise<boolean> => {
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
    time: 60 * 15 * 1000,
    errors: ["time"]
  });

  await roleMember?.roles.remove(privateRole);
  const clearChannel: boolean = (await rsrc.askQuestion(message.member, privateHangoutChannel, "The private discussion has concluded, automatically clear channel?", { yesOrNo: true })) as boolean;

  if (clearChannel) {
    const purge = client.getCommand("purge");
    await purge.run(client, message);
  }

  return true;
};

module.exports.run = run;
module.exports.properties = properties;
