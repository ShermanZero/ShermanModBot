import { Client, Message } from "discord.js";

import rsrc from "../../shared/resources/resources";
import { DiscordConfig } from "../../shared/configs/discord_config";
import { MemberConfig } from "../../shared/configs/member_config";

let discordConfig: DiscordConfig;

module.exports.props = {
  requiresElevation: discordConfig.elevation_names.moderator,
  description: "displays the member's data",
  usage: "<member>"
};

module.exports.run = async (client: Client, message: Message, args: string[]): Promise<boolean> => {
  const member = message.mentions.members.first();

  let username: string;
  let memberConfig: MemberConfig;

  if (!member) {
    if (args.length == 1) {
      memberConfig = rsrc.getMemberConfigFromName(client, message, args[0], true);

      if (!memberConfig) {
        await message.reply("that member is not registered");
        return false;
      } else {
        username = memberConfig?.hidden?.username;
      }
    } else {
      await message.reply("you need to specify a member");
      return false;
    }
  } else {
    username = rsrc.getUsernameFromMember(member);
    memberConfig = client.getMemberConfig(message.guild, username);
  }

  if (!username || !memberConfig) {
    await message.reply("that member is not registered");
    return false;
  }

  memberConfig = client.hideMemberInfo(memberConfig);

  await message.delete();
  await message.channel.send(`Here is the data for [${username.hideID()}]\n\`\`\`json\n${JSON.stringify(memberConfig, null, "\t")}\n\`\`\``);

  return true;
};
