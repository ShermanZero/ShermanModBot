import { ColorResolvable, GuildMember, Message, MessageEmbed } from 'discord.js';

import rsrc from '../classes/Resources';
import ranks from '../resources/ranks';

module.exports.props = {
  description: "replies to the member with their current server stats"
};

module.exports.run = async (client: any, message: Message, args: string[]) => {
  let username: string = rsrc.getUsernameFromMessage(message);
  let content = client.getUserContent(message.guild, username);
  let member: GuildMember = message.member as GuildMember;

  if (message.mentions?.members?.array.length !== 0) {
    member = message.mentions.members!.first() as GuildMember;
    username = rsrc.getUsernameFromMember(member);
    content = rsrc.getUserContentsFromName(client, message, username);
  } else if (args.length === 1) {
    content = rsrc.getUserContentsFromNameWithGuild(client, message.guild, message, args[0], true);
    username = content?.hidden?.username;
  }

  if (!content) {
    message.delete().catch(err => {
      console.log(err);
    });
    return message.reply(`they do not yet have any stats :( they need to post a message in the server to be registered by me`);
  }

  message.channel.send(getEmbed(client, member, content)).catch(err => {
    console.log(err);
  });
  message.delete().catch(err => {
    console.log(err);
  });
};

function getEmbed(client: any, member: GuildMember, content: any) {
  let name = "**" + content.hidden.username.substring(0, content.hidden.username.lastIndexOf("_")).toUpperCase() + "**";

  let rankColor = member.guild.roles.find(role => role.name === content.rank.name)?.color;

  const embed = new MessageEmbed();
  embed.setTitle(name + " | " + calculatePosition(client, content));
  embed.setColor(rankColor as ColorResolvable);
  embed.setThumbnail(ranks.urls[content.rank.name]);

  let levelStats = "";
  if (content.rank.name !== null) levelStats += `**rank:**  *${content.rank.name}*\n`.toUpperCase();
  if (content.rank.level !== null) levelStats += `**level:**  *${content.rank.level}*\n`.toUpperCase();
  if (content.rank.xp !== null) levelStats += `**xp:**  *${getFormattedNumber(content.rank.xp)} / ${getFormattedNumber(content.rank.levelup)}*\n`.toUpperCase();
  if (levelStats !== "") embed.addField("**LEVEL STATS**", levelStats, true);

  let raceStats = "";
  if (content.race.wins !== null) raceStats += `**wins:**  *${content.race.wins}*\n`.toUpperCase();
  if (raceStats !== "") embed.addField("**MARBLE RACE STATS**", raceStats, true);

  let miscStats = "";
  if (content.misc.joined !== null) miscStats += `**joined:**  *${content.misc.joined}*\n`.toUpperCase();
  if (content.misc.first_message !== null) miscStats += `**first message:**  "*${content.misc.first_message}*"\n`;
  if (content.misc.warnings !== null) miscStats += `**warnings:**  *${content.misc.warnings}*\n`.toUpperCase();
  if (miscStats !== "") embed.addField("**MISC. STATS**", miscStats, true);

  let guildName = rsrc.getGuildNameFromGuild(member.guild);
  if (member.roles.get(client.guild_configs[guildName].roles.mod)) {
    embed.setFooter("BE RESPECTFUL TO ALL - ESPECIALLY MODERATORS", "https://i.ibb.co/MC5389q/crossed-swords-2694.png");
    embed.setDescription("`SERVER MOD`");
  }

  return embed;
}

function getFormattedNumber(number: string) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function calculatePosition(client: any, content: any) {
  let guild = client.getGuild(content.hidden.guildname);
  let usersHigher = 0;

  let entries = Object.entries(guild);
  for (let [username, userContent] of entries) if (username != content.hidden.username && (userContent as any).rank.xp > content.rank.xp) usersHigher++;

  return "*RANK #" + (usersHigher + 1) + "*";
}
