import { Client, ColorResolvable, GuildMember, Message, MessageEmbed } from "discord.js";

import rsrc from "../../shared/resources/resources";
import { RankConfig } from "../../shared/configs/ranks_config";
import { MemberConfig } from "../../shared/configs/member_config";

module.exports.props = {
  description: "replies to the member with their current server stats"
};

module.exports.run = async (client: Client, message: Message, args: string[]): Promise<any> => {
  let username: string = rsrc.getUsernameFromMessage(message);
  let memberConfig = client.getMemberConfig(message.guild, username);
  let member: GuildMember = message.member as GuildMember;

  if (message.mentions?.members?.size !== 0) {
    member = message.mentions.members.first();
    username = rsrc.getUsernameFromMember(member);
    memberConfig = rsrc.getMemberConfigFromName(client, message, username);
  } else if (args.length === 1) {
    memberConfig = rsrc.getMemberConfigFromNameWithGuild(client, message.guild, message, args[0], true);
    username = memberConfig?.hidden?.username;
  }

  if (!memberConfig) {
    await message.delete();
    return await message.reply(`they do not yet have any stats :( they need to post a message in the server to be registered by me`);
  }

  await message.channel.send(module.exports.getEmbed(client, member, memberConfig));
  await message.delete();
};

module.exports.getEmbed = (client: Client, member: GuildMember, config: MemberConfig) => {
  let name = "**" + config.hidden.username.substring(0, config.hidden.username.lastIndexOf("_")).toUpperCase() + "**";
  let rankColor = member.guild.roles.find(role => role.name === config.rank.name)?.color;
  let rankConfig: RankConfig;

  const embed = new MessageEmbed();
  embed.setTitle(name + " | " + calculatePosition(client, config));
  embed.setColor(rankColor as ColorResolvable);
  embed.setThumbnail(rankConfig.urls[config.rank.name]);

  let levelStats = "";
  if (config.rank.name !== null) levelStats += `**rank:**  *${config.rank.name}*\n`.toUpperCase();
  if (config.rank.level !== null) levelStats += `**level:**  *${config.rank.level}*\n`.toUpperCase();
  if (config.rank.xp !== null) levelStats += `**xp:**  *${getFormattedNumber(config.rank.xp)} / ${getFormattedNumber(config.rank.levelup)}*\n`.toUpperCase();
  if (levelStats !== "") embed.addField("**LEVEL STATS**", levelStats, true);

  let raceStats = "";
  if (config.race.wins !== null) raceStats += `**wins:**  *${config.race.wins}*\n`.toUpperCase();
  if (raceStats !== "") embed.addField("**MARBLE RACE STATS**", raceStats, true);

  let miscStats = "";
  if (config.misc.joined !== null) miscStats += `**joined:**  *${config.misc.joined}*\n`.toUpperCase();
  if (config.misc.first_message !== null) miscStats += `**first message:**  "*${config.misc.first_message}*"\n`;
  if (config.misc.warnings !== null) miscStats += `**warnings:**  *${config.misc.warnings}*\n`.toUpperCase();
  if (miscStats !== "") embed.addField("**MISC. STATS**", miscStats, true);

  if (member.roles.get(client.getGuildConfig(member.guild).roles.mod)) {
    embed.setFooter("BE RESPECTFUL TO ALL - ESPECIALLY MODERATORS", "https://i.ibb.co/MC5389q/crossed-swords-2694.png");
    embed.setDescription("`SERVER MOD`");
  }

  return embed;
};

/**
 * Returns a comma-separated number
 *
 * @param {string} number the number to format
 */
function getFormattedNumber(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Calculate the position (rank) of a member
 *
 * @param {Client} client the Discord `Client`
 * @param {*} config the member's config
 */
function calculatePosition(client: Client, config: MemberConfig): string {
  let guild = client.getGuild(config.hidden.guildname);
  let membersHigher = 0;

  let entries = Object.entries(guild);
  for (let [username, memberConfig] of entries) if (username != config.hidden.username && (memberConfig as any).rank.xp > config.rank.xp) membersHigher++;

  return "*RANK #" + (membersHigher + 1) + "*";
}
