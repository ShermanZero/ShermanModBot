const User = require("../classes/User.js");
const Discord = require("discord.js");
const ranks = require("../resources/ranks/ranks.json");

exports.props = {
  "description": "replies to the user with their current server stats",
  "usage": ""
};

exports.run = (client, message, args) => {
  let user = User.getUsernameFromMessage(message);
  let content = client.usersInSession.get(user);

  if(message.mentions.members.size !== 0) {
    user = User.getUsernameFromMember(message.mentions.members.first());
    content = User.getUserContentsFromName(user);
  }

  if(!content) {
    message.delete().catch((err) => {console.log(err)});
    return message.reply(`${message.mentions.members.first().displayName} does not yet have any stats :( they need to post a message in the server to be registered by me.`)
      .catch((err) => {console.log(err)});
  }

  message.channel.send(exports.getEmbed(client, message, content)).catch((err) => {console.log(err)});
  message.delete().catch((err) => {console.log(err)});
}

exports.getEmbed = (client, message, content) => {
  let name = "**"+content.name.substring(0, content.name.lastIndexOf("_")).toUpperCase()+"**";

  let rankColor = message.guild.roles.find(role => role.name === content.rank.name).color;

  const embed = new Discord.RichEmbed();
  embed.setTitle(name + " | " + calculatePosition(client, content));
  embed.setColor(rankColor);
  embed.setThumbnail(ranks.urls[content.rank.name]);

  let rank = `**rank:**  *${content.rank.name}*`.toUpperCase();
  let level = `**level:**  *${content.rank.level}*`.toUpperCase();
  let expGoal = `**xp:**  *${getFormattedNumber(content.rank.xp)} / ${getFormattedNumber(content.rank.levelup)}*`.toUpperCase();
  embed.addField("**LEVEL STATS**", `${rank}\n${level}\n${expGoal}`);

  let wins = `**wins:**  *${content.race.wins}*`.toUpperCase();
  embed.addField("**MARBLE RACE STATS**", `${wins}`);

  let joined = `**joined:**  *${content.misc.joined}*`.toUpperCase();
  let firstMessage = `**first message:**  *${content.misc.first_message}*`.toUpperCase();
  let warnings = `**warnings:**  *${content.misc.warnings}*`.toUpperCase();
  embed.addField("**MISC STATS**", `${joined}\n${firstMessage}\n${warnings}`);

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
