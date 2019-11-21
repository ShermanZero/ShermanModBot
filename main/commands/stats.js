const path = require("path");
const User = require(path.join(__dirname, "..", "classes", "User.js"));
const Discord = require("discord.js");
const ranks = require(path.join(__dirname, "..", "resources", "ranks", "ranks.json"));

exports.props = {
  "description": "replies to the user with their current server stats",
  "usage": ""
};

exports.run = (client, message, args) => {
  let user = User.getUsernameFromMessage(message);
  let content = client.usersInSession.get(user);
  let member = message.member;

  if(message.mentions.members.size !== 0) {
    member = message.mentions.members.first();
    user = User.getUsernameFromMember(member);
    content = User.getUserContentsFromName(user);
  }

  if(!content) {
    message.delete().catch((err) => {console.log(err)});
    return message.reply(`${message.mentions.members.first().displayName} does not yet have any stats :( they need to post a message in the server to be registered by me.`)
      .catch((err) => {console.log(err)});
  }

  message.channel.send(exports.getEmbed(client, member, content)).catch((err) => {console.log(err)});
  message.delete().catch((err) => {console.log(err)});
}

exports.getEmbed = (client, member, content) => {
  let name = "**"+content.name.substring(0, content.name.lastIndexOf("_")).toUpperCase()+"**";

  let rankColor = member.guild.roles.find(role => role.name === content.rank.name).color;

  const embed = new Discord.RichEmbed();
  embed.setTitle(name + " | " + calculatePosition(client, content));
  embed.setColor(rankColor);
  embed.setThumbnail(ranks.urls[content.rank.name]);

  let levelStats = new String();
  if(content.rank.name !== "")
    levelStats += `**rank:**  *${content.rank.name}*\n`.toUpperCase();
  if(content.rank.level !== "")
    levelStats += `**level:**  *${content.rank.level}*\n`.toUpperCase();
  if(content.rank.xp !== "")
    levelStats += `**xp:**  *${getFormattedNumber(content.rank.xp)} / ${getFormattedNumber(content.rank.levelup)}*\n`.toUpperCase();
  embed.addField("**LEVEL STATS**", levelStats);

  let raceStats = new String();
  if(content.race.wins !== "")
    raceStats += `**wins:**  *${content.race.wins}*\n`.toUpperCase();
  embed.addField("**MARBLE RACE STATS**", raceStats);

  let miscStats = new String();
  if(content.misc.joined !== "")
    miscStats += `**joined:**  *${content.misc.joined}*\n`.toUpperCase();
  if(content.misc.first_message !== "")
    miscStats += `**first message:**  *${content.misc.first_message}*\n`.toUpperCase();
  if(content.misc.warnings !== "")
    miscStats += `**warnings:**  *${content.misc.warnings}*\n`.toUpperCase();

  embed.addField("**MISC. STATS**", miscStats);

  if(member.roles.has(client.config.roles.mod)) {
    embed.setFooter("BE RESPECTFUL TO ALL - ESPECIALLY MODERATORS", "https://i.ibb.co/MC5389q/crossed-swords-2694.png");
    embed.setDescription("`SERVER MOD`");
  }

  return embed;
}

function getFormattedNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function calculatePosition(client, content) {
  let usersHigher = 0;
  let totalUsers = 0;

  client.usersInSession.forEach((userContent, user) => {
    totalUsers++;

    if(user !== content.name) {
      if(userContent.rank.xp > content.rank.xp)
        usersHigher++;
    }
  });

  return "*RANK #" + (usersHigher + 1) + "*";
}
