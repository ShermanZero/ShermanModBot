const fs = require('fs');
const Discord = require("discord.js");
const User = require("../classes/User.js");
const ranks = require("../resources/ranks/ranks.json");

module.exports = (client, message) => {
  var forLog = "[" + message.createdAt + "] " + message.author.tag + ": " + message.content + "\n";

  //append the message to the log file
  fs.appendFileSync("./logs/allmessages.txt", forLog);

  //ignore all bots
  if(message.author.bot) return;

  //register the user
  registerUser(client, message);
  awardExperience(client, message);

  //ignore messages not starting with the prefix
  if(message.content.indexOf(client.config.prefix) !== 0) return;

  //standard argument/command name definition
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  //grab the command data from the client.commands Enmap
  const cmd = client.commands.get(command);

  //if the command doesn't exist
  if(!cmd) return;

  //run the command
  cmd.run(client, message, args);
}

//registers the user's actions
function registerUser(client, message) {
  let user = User.getUserFromMessage(message);
  let dir = "./users/" + user;

  if(!fs.existsSync(dir))
    User.createUserDirectory(user);

  let content = null;
  //check if the user has been stored in the local client session
  if(!client.usersInSession.has(user)) {
    content = User.getUserContentsFromName(user);
    client.usersInSession.set(user, content);
    console.log("Added new user to session: " + user);
  } else {
    content = client.usersInSession.get(user);
  }

  let timestamp = message.createdAt;
  let newTimestamp = (timestamp.getMonth()+1) + "/" + timestamp.getDate() + " " + timestamp.getHours() + ":" + timestamp.getMinutes() + ":" + timestamp.getSeconds();

  content.log.push(`[${newTimestamp}] (#${message.channel.name}): ${message.content}\n`);

  if(content.log.length >= client.config.preferences.log_threshold) {
    let logsDir = `${dir}/logs`;

    for(var i = 0; i < content.log.length; i++)
      fs.appendFileSync(`${logsDir}/${client.config.files.log_all}`, content.log[i]);

    content.log = [];
  }

  client.usersInSession.set(user, content);
}

//awards the user experience for posting a message
function awardExperience(client, message) {
  let user = User.getUserFromMessage(message);

  //get the content from the session instead of from the file
  let content = client.usersInSession.get(user);

  content.rank.xp += 1;

  if(content.rank.xp >= content.rank.levelup) {
    content.rank.xp = 0;
    content.rank.level += 1;

    var rank = ranks.levels[content.rank.level];
    if(rank) {
      var lastRank = content.rank.name;

      content.rank.name = rank;
      let oldRole = message.guild.roles.find(role => role.name.toLowerCase() === lastRank.toLowerCase());
      let newRole = message.guild.roles.find(role => role.name.toLowerCase() === rank.toLowerCase());

      if(oldRole)
        message.member.removeRole(oldRole).catch((err) => {console.log(err)});

      message.member.addRole(newRole).catch((err) => {console.log(err)});
    }

    content.rank.levelup = Math.round( (4 * Math.pow(3, content.rank.level)) / 5 );
    levelUp(client, message, content);
  }

  client.usersInSession.set(user, content);

  //only write XP changes to the file every 10 messages
  if((content.rank.xp % client.config.preferences.xp_threshold) === 0) {
    let jsonFile = `./users/${user}/${user}.json`;
    let newJson = JSON.stringify(content, null, "\t");
    fs.writeFileSync(jsonFile, newJson);
  }
}

function levelUp(client, message, content) {
  var stats = client.commands.get("stats");
  let embed = stats.getEmbed(content);

  message.channel.send(`Congratulations ${message.author}!  You just leveled up!  Keep chatting to earn more XP and unlock roles and special perks!`);
  message.channel.send(embed);
}
