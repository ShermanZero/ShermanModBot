const User = require("../classes/User.js");
const Discord = require("discord.js");
const ranks = require("../resources/ranks/ranks.json");

exports.props = {
  "requiresElevation": false,
  "description": "replies to the user with their current server stats",
  "usage": ""
};

exports.run = (client, message, args) => {
  let user = User.getUserFromMessage(message);
  let content = client.usersInSession.get(user);

  if(message.mentions.members.size !== 0) {
    user = User.getUserFromName(message.mentions.members.first().displayName);
    content = User.getUserContentsFromName(user);
  }

  if(!content) {
    message.delete().catch((err) => {console.log(err)});
    return message.reply(`${message.mentions.members.first().displayName} does not yet have any stats :( they need to post a message in the server to be registered by me.`)
      .catch((err) => {console.log(err)});
  }

  message.channel.send(exports.getEmbed(client, content)).catch((err) => {console.log(err)});
  message.delete().catch((err) => {console.log(err)});
}

exports.getEmbed = (client, content) => {
  const embed = new Discord.RichEmbed();
  embed.setTitle(content.name);
  embed.setColor(0x40b7e6);
  embed.setThumbnail(ranks.urls[content.rank.name]);

  var rank = `**rank:**  *${content.rank.name}*`;
  var level = `**level:**  *${content.rank.level}*`;
  var expGoal = `**xp:**  *${content.rank.xp}/${content.rank.levelup}xp*`;
  var wins = `**wins:**  *${content.race.wins}*`;

  embed.addField("**LEVEL STATS**", `${rank}\n${level}\n${expGoal}`);
  embed.addField("**MARBLE RACE STATS**", `${wins}`);

  return embed;
}

function calculatePosition(client) {
  
}
