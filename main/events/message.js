const fs = require('fs');
const Discord = require("discord.js");
const User = require("../classes/User.js");
const ranks = require("../resources/ranks/ranks.json");
const blacklist = require("../resources/misc/blacklist.json");

module.exports = (client, message) => {
  //ignore all bots
  if(message.author.bot) return;

  //register the user
  registerUser(client, message);

  //check against blacklist
  if(blacklist.words.some(substring => message.content.includes(substring))) {
    message.delete().catch((err) => {console.log(err)});
    message.reply("that is not allowed here.").catch((err) => {console.log(err)});
  }

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

  if(cmd.props.requiresElevation || cmd.props.requiresElevation !== "")
    if(!message.member.roles.has(client.config.roles[cmd.props.requiresElevation])) return;

  //run the command
  cmd.run(client, message, args);
}

//registers the user's actions
function registerUser(client, message) {
  let user = User.getUsernameFromMessage(message);
  let dir = "./users/" + user;

  if(!fs.existsSync(dir))
    User.createUserDirectory(user);

  let content = null;
  //check if the user has been stored in the local client session
  if(!client.usersInSession.has(user)) {
    content = User.getUserContentsFromName(user);
    client.usersInSession.set(user, content);
    console.log(`*Registered [${user}] to session`);
  } else {
    content = client.usersInSession.get(user);
  }

  if(!content) return console.error(`Could not retrieve contents for [${user}]`);

  let timestamp = message.createdAt;
  let date = ((timestamp.getMonth() + 1) +"/"+timestamp.getDate()).replace(/.*(\d{2}\/\d{2}).*/, "$1");
  let time = timestamp.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
  let newTimestamp = date + "  " + time;

  let logMessage = `[${newTimestamp}] (#${message.channel.name}): ${message.content}\n`;

  //push the message to the master log branch
  client.masterLog.push(logMessage);
  //if the log length exceeds the threshold, update the master log
  updateMasterLog(client);

  //push the user's message directly to the user's log
  content.userLog.push(logMessage);
  //if the log length exceeds the threshold, update the user log
  updateUserLog(client, content);

  console.log(content);
}

function updateMasterLog(client) {
  let masterLog = `./logs/${client.config.files.log_all}`;

  if(!fs.existsSync(masterLog))
    fs.writeFileSync(masterLog, "");

  //if the log length exceeds the threshold, update the master log
  if(client.masterLog.length >= client.config.preferences.log_threshold_master) {
    for(var i = 0; i < client.masterLog.length; i++)
      fs.appendFileSync(masterLog, client.masterLog[i]);

    client.masterLog = [];
  }
}

function updateUserLog(client, content) {
  let logsDir = `./users/${content.name}/logs`;
  let userLog = `${logsDir}/${client.config.files.log_all}`;

  if(!fs.existsSync(userLog))
    fs.writeFileSync(userLog, "");

  //if the log length exceeds the threshold, update the master log
  if(content.userLog.length >= client.config.preferences.log_threshold_user) {
    for(var i = 0; i < content.userLog.length; i++)
      fs.appendFileSync(userLog, content.userLog[i]);

    content.userLog = [];
  }

  //have to update the Enmap
  client.usersInSession.set(content.name, content);
}

//awards the user experience for posting a message
function awardExperience(client, message) {
  let user = User.getUsernameFromMessage(message);

  //get the content from the session instead of from the file
  let content = client.usersInSession.get(user);

  content.rank.xp += 1;

  if(content.rank.xp >= content.rank.levelup) {
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

    content.rank.levelup = content.rank.xp + Math.round( (4 * Math.pow(3, content.rank.level)) / 5 );
    levelUp(client, message, content);
  }

  //have to update the Enmap
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
  let embed = stats.getEmbed(client, message, content);

  message.channel.send(`Congratulations ${message.author}!  You just leveled up!  Keep chatting to earn more XP and unlock roles and special perks!`);
  message.channel.send(embed);
}
