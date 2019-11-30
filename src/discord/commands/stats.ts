import { Client, ColorResolvable, GuildMember, Message, MessageEmbed } from "discord.js";

import rsrc from "../discord-resources";
import { CommandType, ElevationTypes } from "../@interfaces/@commands";
import MemberConfig from "../configs/member_config";
import { MemberConfigType } from "../@interfaces/@member_config";

class Stats implements CommandType {
  props = {
    requiresElevation: ElevationTypes.everyone,
    description: "replies with your current server stats",
    usage: "<?@user | username>"
  };

  async run(client: Client, message: Message, ...args: any[]): Promise<boolean> {
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
      await message.reply(`they do not yet have any stats :( they need to post a message in the server to be registered by me`);
      return false;
    }

    await message.channel.send(this.getEmbed(client, member, memberConfig));
    await message.delete();

    return true;
  }

  getEmbed(client: Client, member: GuildMember, config: MemberConfigType): MessageEmbed {
    let name = "**" + config.hidden.username.substring(0, config.hidden.username.lastIndexOf("_")).toUpperCase() + "**";
    let rankColor = member.guild.roles.find(role => role.name === config.rank.name)?.color;

    const embed = new MessageEmbed();
    embed.setTitle(name + " | " + calculatePosition(client, config));
    embed.setColor(rankColor as ColorResolvable);
    embed.setThumbnail(Ranks.urls[config.rank.name]);

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
  }
}

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

module.exports = Stats;
