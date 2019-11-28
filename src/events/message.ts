import 'colors';

import { Client, Guild, Message, Role, TextChannel } from 'discord.js';
import * as fs from 'fs';
import * as path from 'path';

import blacklist from '../resources/blacklist';
import global_config from '../resources/global_config';
import ranks from '../resources/ranks';
import rsrc from '../resources/resources';

module.exports = (client: Client, message: Message) => {
  //ignore all bots
  if (message.author.bot) return;

  //register the user
  if (!registerMessage(client, message)) return console.error(`!! Could not register message sent by [${rsrc.getUsernameFromMessage(message)}]`.red);

  //check against blacklist
  if (blacklist.words.some(substring => message.content.includes(substring))) {
    message.delete().catch(err => {
      console.log(err);
    });
    message.reply("that is not allowed here.").catch(err => {
      console.log(err);
    });
  }

  awardExperience(client, message);

  //ignore messages not starting with the prefix
  if (message.content.indexOf(client.global_config.prefix) !== 0) return;

  //standard argument/command name definition
  const args: any = message.content
    .slice(client.global_config.prefix.length)
    .trim()
    .split(/ +/g);

  let command: any;
  if (args) command = args.shift().toLowerCase();
  if (!command) return;

  //grab the command data from the client.commands Enmap
  const cmd = client.getCommand(command);

  //if the command doesn't exist
  if (!cmd) return;

  let guildDir = rsrc.getGuildDirectoryFromGuild(message.guild);

  let guildConfigFile = path.resolve(guildDir, client.global_config.files.guild_config);
  let guildConfig: any;
  if (fs.existsSync(guildConfigFile)) guildConfig = require(guildConfigFile);

  if (command != "config") {
    if (!guildConfig?.setup) return message.reply("your guild owner has to configure me before I can execute commands :(");
    if (cmd.props.requiresElevation && message.member.user.id !== client.secrets.botowner) {
      if (!message.member?.roles.get(guildConfig.roles[cmd.props.requiresElevation])) return;
    }
  }

  //run the command
  cmd.run(client, message, args);
};

//registers the message
function registerMessage(client: Client, message: Message) {
  let username = rsrc.getUsernameFromMessage(message);

  if (!message.guild) return;

  let guildName = rsrc.getGuildNameFromGuild(message.guild);
  let userDir = rsrc.getUserDirectoryFromGuild(message.guild, username);

  let content: any;

  //if the user has not been registered
  if (!fs.existsSync(userDir)) rsrc.createUserDirectory(client, message.guild, message.member!);

  //user NOT stored in local client session
  if (!client.hasUser(message.guild, username)) {
    content = rsrc.getUserContentsFromName(client, message, username);
    client.registerUser(content);
    //user stored in local client session
  } else {
    content = client.getUserContent(message.guild, username);
  }

  if (content === null || typeof content === "undefined") {
    console.error(`!! Could not retrieve contents for [${username}]`.red);
    return false;
  }

  if (content.misc.first_message === null || typeof content.misc.first_message === "undefined") {
    content.misc.first_message = message.content;
    client.updateUser(content);
  }

  let logMessage = `[${getTimestamp(message)}] (#${(message.channel as TextChannel).name}): ${message.content}\n`;

  //push the message to the master log branch
  client.masterLog.push(`/${guildName}/>  ${username} ${logMessage}`);
  //if the log length exceeds the threshold, update the master log
  updateMasterLog(client);

  //push the user's message directly to the user's log
  content.userLog.push(logMessage);
  //if the log length exceeds the threshold, update the user log
  updateUserLog(client, message.guild, content);

  return true;
}

function getTimestamp(message: Message) {
  let timestamp = message.createdAt;
  let date = (timestamp.getMonth() + 1 + "/" + timestamp.getDate()).replace(/.*(\d{2}\/\d{2}).*/, "$1");
  let time = timestamp.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");

  return date + "  " + time;
}

function updateMasterLog(client: Client) {
  let masterLog = path.join(__dirname, "..", "logs");

  if (!fs.existsSync(masterLog)) {
    fs.mkdirSync(masterLog, { recursive: true });
    fs.writeFileSync(path.resolve(masterLog, global_config.files.log_all), "-- START OF LOG --");
  }

  //if the log length exceeds the threshold, update the master log
  if (client.masterLog.length >= client.global_config.preferences.log_threshold_master) {
    for (let i = 0; i < client.masterLog.length; i++) fs.appendFileSync(masterLog, client.masterLog[i]);

    client.masterLog = [];
  }
}

function updateUserLog(client: Client, guild: Guild, content: any) {
  let logsDir = path.join(rsrc.getUserDirectoryFromGuild(guild, content.hidden.username), "logs");
  let userLog = path.join(logsDir, client.global_config.files.log_all);

  //if the log length exceeds the threshold, update the master log
  if (content.userLog.length >= client.global_config.preferences.log_threshold_user) {
    for (let i = 0; i < content.userLog.length; i++) fs.appendFileSync(userLog, content.userLog[i]);

    content.userLog = [];
  }

  //have to update the Enmap
  client.updateUser(content);

  //log it to the console
  console.log(`[${content.hidden.guildname.magenta}] =>`, `[${content.hidden.username.magenta}] =>`, content);
}

//awards the user experience for posting a message
function awardExperience(client, message) {
  let username = rsrc.getUsernameFromMessage(message);

  //get the content from the session instead of from the file
  let content = client.getUserContent(message.guild, username);

  if (!content) {
    return console.error(`!! Could not retrieve contents from [${username}]`);
  }

  content.rank.xp += 1;

  if (content.rank.xp >= content.rank.levelup) {
    content.rank.level += 1;

    let rank = ranks.levels[content.rank.level];
    if (rank) {
      let lastRank = content.rank.name;

      content.rank.name = rank;
      let oldRole = message.guild.roles.find((role: Role) => role.name.toLowerCase() === lastRank.toLowerCase());
      let newRole = message.guild.roles.find((role: Role) => role.name.toLowerCase() === rank.toLowerCase());

      if (oldRole)
        message.member.removeRole(oldRole).catch((err: any) => {
          console.log(err);
        });

      message.member.addRole(newRole).catch((err: any) => {
        console.log(err);
      });
    }

    content.rank.levelup = rsrc.getXPToLevelUp(content.rank.xp, content.rank.level);
    levelUp(client, message, content);
  }

  client.updateUser(content);

  //only write XP changes to the file every 10 messages
  if (content.rank.xp % client.global_config.preferences.xp_threshold === 0) {
    let jsonFile = path.join(rsrc.getUserDirectoryFromGuild(message.guild, username), username + ".json");
    let newJson = JSON.stringify(content, null, "\t");
    fs.writeFileSync(jsonFile, newJson);
  }
}

function levelUp(client: Client, message: Message, content: any) {
  let stats = client.getCommand("stats");
  let embed = stats.getEmbed(client, message.member, content);

  message.channel.send(`Congratulations ${message.author}!  You just leveled up!  Keep chatting to earn more XP and unlock roles and special perks!`);
  message.channel.send(embed);
}
