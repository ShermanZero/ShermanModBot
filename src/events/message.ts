import { Client, Message, Role, TextChannel } from "discord.js";
import * as fs from "fs";
import * as path from "path";

import blacklist from "../resources/blacklist";
import ranks from "../resources/ranks";
import rsrc from "../resources/resources";

module.exports = async (client: Client, message: Message) => {
  //ignore all bots
  if (message.author.bot) return;

  //register the user
  if (!registerMessage(client, message)) return `Could not register message sent by [${rsrc.getUsernameFromMessage(message)}]`.error();

  //check against blacklist
  if (blacklist.words.some(substring => message.content.includes(substring))) {
    await message.delete();
    await message.reply("that is not allowed here, you have been warned.");

    let username = rsrc.getUsernameFromMessage(message);
    let content = rsrc.getMemberContentsFromName(client, message, username);

    if (content) {
      content.misc.warnings++;
      client.updateMember(content);
    }
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

/**
 * Registers a message that has been posted in a guild
 *
 * @param client the Discord client
 * @param message the Discord message
 */
function registerMessage(client: Client, message: Message) {
  let username = rsrc.getUsernameFromMessage(message);

  if (!message.guild) return;

  let guildName = rsrc.getGuildNameFromGuild(message.guild);
  let userDir = rsrc.getMemerDirectoryFromGuild(message.guild, username);

  let content: any;

  //if the user has not been registered
  if (!fs.existsSync(userDir)) rsrc.createMemberDirectory(client, message.guild, message.member!);

  //user NOT stored in local client session
  if (!client.hasMember(message.guild, username)) {
    content = rsrc.getMemberContentsFromName(client, message, username);
    client.registerMember(content);
    //user stored in local client session
  } else {
    content = client.getMemberContent(message.guild, username);
  }

  if (!content) {
    `Could not retrieve contents for [${username}]`.error();
    return false;
  }

  if (!content.misc.first_message) {
    content.misc.first_message = message.content;
    client.updateMember(content);
  }

  let timestamp = getTimestamp(message);
  let channelName = (message.channel as TextChannel).name;
  let userLogMessage = `[${timestamp.yellow}] (#${channelName.red}): ${message.content}`;
  let masterLogMessage = `/${guildName.magenta}/>  ${username.magenta} ${userLogMessage}`;

  client.masterLog.push(masterLogMessage.stripColors + "\n");
  masterLogMessage.masterLog(client, client.global_config.files.logs.message, true);

  content.userLog.push(userLogMessage.stripColors + "\n");
  userLogMessage.userLog(client, message.guild, content, client.global_config.files.logs.message);

  return true;
}

/**
 * Returns a comprehensive timestamp for a message
 *
 * @param message the Discord message
 */
function getTimestamp(message: Message) {
  let timestamp = message.createdAt;
  let date = (timestamp.getMonth() + 1 + "/" + timestamp.getDate()).replace(/.*(\d{2}\/\d{2}).*/, "$1");
  let time = timestamp.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");

  return date + "  " + time;
}

/**
 * Awards the member experience for posting a message
 *
 * @param client the Discord client
 * @param message the Discord message
 */
async function awardExperience(client: Client, message: Message) {
  let username = rsrc.getUsernameFromMessage(message);

  //get the content from the session instead of from the file
  let content = client.getMemberContent(message.guild, username);

  if (!content) {
    return `Could not retrieve contents from [${username}]`.error();
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

      if (oldRole) await message.member.roles.remove(oldRole);

      await message.member.roles.add(newRole);
    }

    content.rank.levelup = rsrc.getXPToLevelUp(content.rank.xp, content.rank.level);
    levelUp(client, message, content);
  }

  client.updateMember(content);

  //only write XP changes to the file every 10 messages
  if (content.rank.xp % client.global_config.preferences.xp_threshold === 0) {
    let jsonFile = path.join(rsrc.getMemerDirectoryFromGuild(message.guild, username), username + ".json");
    let newJson = JSON.stringify(content, null, "\t");
    fs.writeFileSync(jsonFile, newJson);
  }
}

/**
 * Level's up a member
 *
 * @param client the Discord client
 * @param message the Discord message
 * @param content the member's content
 */
function levelUp(client: Client, message: Message, content: any) {
  let stats = client.getCommand("stats");
  let embed = stats.getEmbed(client, message.member, content);

  message.channel.send(`Congratulations ${message.author}!  You just leveled up!  Keep chatting to earn more XP and unlock roles and special perks!`);
  message.channel.send(embed);
}
