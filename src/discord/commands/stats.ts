import { Client, ColorResolvable, GuildMember, Message, MessageEmbed } from "discord.js";

import rsrc from "../resources";
import { CommandType } from "../@interfaces/@commands";
import MemberConfig from "../configs/member_config";
import { MemberConfigType } from "../@interfaces/@member_config";
import { Ranks } from "../@interfaces/@ranks";
import { ArgumentsNotFulfilled } from "../../shared/extensions/error/error-extend";
import { GuildElevationTypes } from "../@interfaces/@guild_config";
import { Guild } from "discord.js";

const properties: CommandType["properties"] = {
  elevation: GuildElevationTypes.everyone,
  description: "replies with your current server stats",
  usage: "<?@user | username>"
};

const run: CommandType["run"] = async (client: Client, message: Message, args: string[]): Promise<boolean> => {
  let username: string = rsrc.getUsernameFromMessage(message);
  let memberConfig = client.getMemberConfig(message.guild, username);
  let member: GuildMember = message.member as GuildMember;

  if (message.mentions?.members?.size !== 0) {
    member = message.mentions.members.first();
    username = rsrc.getUsernameFromMember(member);
    memberConfig = await rsrc.getMemberConfigFromName(client, message, username);
  } else if (args.length === 1) {
    memberConfig = await rsrc.getMemberConfigFromNameWithGuild(client, message.guild, message, args[0], true);
    username = memberConfig?.hidden?.username;
  }

  if (!memberConfig) {
    await message.delete();
    await message.reply(`they do not yet have any stats :( they need to post a message in the server to be registered by me`);
    return false;
  }

  await message.channel.send(custom.embed(client, member.guild, memberConfig));
  await message.delete();

  return true;
};

const custom: CommandType["custom"] = {
  embed: (client: Client, guild: Guild, memberConfig: MemberConfigType): MessageEmbed => {
    new ArgumentsNotFulfilled(client, guild, memberConfig);

    let name = "**" + memberConfig.hidden.username.substring(0, memberConfig.hidden.username.lastIndexOf("_")).toUpperCase() + "**";
    let rankColor = guild.roles.find(role => role.name === memberConfig.rank.name)?.color;

    const embed = new MessageEmbed();
    embed.setTitle(name + " | " + calculatePosition(client, memberConfig));
    embed.setColor(rankColor as ColorResolvable);
    embed.setThumbnail(Ranks.urls[memberConfig.rank.name]);

    let levelStats = "";
    if (memberConfig.rank.name !== null) levelStats += `**rank:**  *${memberConfig.rank.name}*\n`.toUpperCase();
    if (memberConfig.rank.rankup !== null) levelStats += `**next rank:**  *${memberConfig.rank.rankup}*\n`.toUpperCase();
    if (memberConfig.rank.level !== null) levelStats += `**level:**  *${memberConfig.rank.level}*\n`.toUpperCase();
    if (memberConfig.rank.xp !== null) levelStats += `**xp:**  *${getFormattedNumber(memberConfig.rank.xp)} / ${getFormattedNumber(memberConfig.rank.levelup)}*\n`.toUpperCase();
    if (levelStats !== "") embed.addField("**LEVEL STATS**", levelStats, true);

    let raceStats = "";
    if (memberConfig.race.wins !== null) raceStats += `**wins:**  *${memberConfig.race.wins}*\n`.toUpperCase();
    if (raceStats !== "") embed.addField("**MARBLE RACE STATS**", raceStats, true);

    let miscStats = "";
    if (memberConfig.misc.joined !== null) miscStats += `**joined:**  *${memberConfig.misc.joined}*\n`.toUpperCase();
    if (memberConfig.misc.first_message !== null) miscStats += `**first message:**`.toUpperCase() + `"*${memberConfig.misc.first_message}*"\n`;
    if (memberConfig.misc.warnings !== null) miscStats += `**warnings:**  *${memberConfig.misc.warnings}*\n`.toUpperCase();
    if (miscStats !== "") embed.addField("**MISC. STATS**", miscStats, true);

    let description = "";
    let separator = " | ";
    const guildConfig = client.getGuildConfig(guild);
    Object.keys(guildConfig.role_names).forEach(roleName => {
      if (memberConfig.permissions[roleName]) description += roleName + separator;
    });

    if (description.length >= separator.length) description = description.substring(0, description.length - separator.length);
    if (description.length > 0) {
      embed.setFooter("RESPECT THE BADGE!  RESPECT IT!", "https://i.ibb.co/MC5389q/crossed-swords-2694.png");
      embed.setDescription(`\`   SERVER ${description.toUpperCase()}   \``);
    }

    return embed;
  }
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
  let guild = client.getGuildMembers(config.hidden.guildname);
  let membersHigher = 0;

  guild.forEach((memberConfig: MemberConfigType, username: string) => {
    if (memberConfig.hidden.username !== config.hidden.username && memberConfig.rank.xp > config.rank.xp) membersHigher++;
  });

  return "*POSITION #" + (membersHigher + 1) + "*";
}

module.exports.run = run;
module.exports.properties = properties;
module.exports.custom = custom;
