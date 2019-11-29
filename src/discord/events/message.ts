import { Client, Message, Role, TextChannel } from "discord.js";
import * as fs from "fs";
import * as path from "path";

import blacklist from "../../shared/resources/blacklist";
import rsrc from "../discord-resources";
import { MemberConfig } from "../configs/member_config";
import { RankConfig } from "../configs/ranks_config";

module.exports = async (client: Client, message: Message): Promise<boolean> => {
  //ignore all bots
  if (message.author.bot) return false;

  //register the member
  if (!registerMessage(client, message)) {
    `Could not register message sent by [${rsrc.getUsernameFromMessage(message)}]`.error();
    return false;
  }

  //check against blacklist
  if (blacklist.words.some(substring => message.content.includes(substring))) {
    await message.delete();
    await message.reply("that is not allowed here, you have been warned.");

    let username = rsrc.getUsernameFromMessage(message);
    let memberConfig = rsrc.getMemberConfigFromName(client, message, username);

    if (memberConfig) {
      memberConfig.misc.warnings++;
      client.updateMember(memberConfig);
    }
  }

  awardExperience(client, message);

  //ignore messages not starting with the prefix
  if (message.content.indexOf(DiscordConfig.prefix) !== 0) return false;

  //standard argument/command name definition
  const args: any = message.content
    .slice(DiscordConfig.prefix.length)
    .trim()
    .split(/ +/g);

  let command: any;
  if (args) command = args.shift().toLowerCase();
  if (!command) return false;

  //grab the command data from the client.commands Enmap
  const cmd = client.getCommand(command);

  //if the command doesn't exist
  if (!cmd) return false;

  let guildDir = rsrc.getGuildDirectoryFromGuild(message.guild);

  let guildConfigFile = path.resolve(guildDir, "guild_config.json");
  let guildConfig: any;
  if (fs.existsSync(guildConfigFile)) guildConfig = require(guildConfigFile);

  if (command != "config") {
    if (!guildConfig?.setup) {
      await message.reply("your guild owner has to configure me before I can execute commands :(");
      return false;
    }
    if (cmd.props.requiresElevation && message.member.user.id !== DiscordSecrets.botowner) {
      if (!message.member?.roles.get(guildConfig.roles[cmd.props.requiresElevation])) return false;
    }
  }

  //run the command
  cmd.run(client, message, args);

  return true;
};

/**
 * Registers a message that has been posted in a guild
 *
 * @param client the Discord client
 * @param message the Discord message
 */
function registerMessage(client: Client, message: Message): boolean {
  let username = rsrc.getUsernameFromMessage(message);

  if (!message.guild) return false;

  let guildName = rsrc.getGuildNameFromGuild(message.guild);
  let memberDir = rsrc.getMemberDirectoryFromGuild(message.guild, username);

  let memberConfig: MemberConfig;

  //if the member has not been registered
  if (!fs.existsSync(memberDir)) rsrc.createMemberDirectory(client, message.guild, message.member!);

  //member NOT stored in local client session
  if (!client.hasMember(message.guild, username)) {
    memberConfig = rsrc.getMemberConfigFromName(client, message, username);
    client.registerMember(memberConfig);
    //member stored in local client session
  } else {
    memberConfig = client.getMemberConfig(message.guild, username);
  }

  if (!memberConfig) {
    `Could not retrieve config for [${username}]`.error();
    return false;
  }

  if (!memberConfig.misc.first_message) {
    memberConfig.misc.first_message = message.content;
    client.updateMember(memberConfig);
  }

  let timestamp = getTimestamp(message);
  let channelName = (message.channel as TextChannel).name;
  let memberLogMessage = `[${timestamp.yellow}] (#${channelName.red}): ${message.content}`;
  let masterLogMessage = `/${guildName.magenta}/>  ${username.magenta} ${memberLogMessage}`;

  client.masterLog.push(masterLogMessage.stripColors + "\n");
  masterLogMessage.masterLog(client, DiscordConfig.logs.message, true);

  memberConfig.memberLog.push(memberLogMessage.stripColors + "\n");
  memberLogMessage.memberLog(client, message.guild, memberConfig, DiscordConfig.logs.message);

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
async function awardExperience(client: Client, message: Message): Promise<any> {
  let username = rsrc.getUsernameFromMessage(message);
  let rankConfig: RankConfig = {} as any;

  //get the config from the session instead of from the file
  let memberConfig = client.getMemberConfig(message.guild, username);

  if (!memberConfig) {
    `Could not retrieve config from [${username}]`.error();
    return;
  }

  memberConfig.rank.xp += 1;

  if (memberConfig.rank.xp >= memberConfig.rank.levelup) {
    memberConfig.rank.level += 1;

    let rank = rankConfig.levels[memberConfig.rank.level];
    if (rank) {
      let lastRank = memberConfig.rank.name;

      memberConfig.rank.name = rank;
      let oldRole = message.guild.roles.find((role: Role) => role.name.toLowerCase() === lastRank.toLowerCase());
      let newRole = message.guild.roles.find((role: Role) => role.name.toLowerCase() === rank.toLowerCase());

      if (oldRole) await message.member.roles.remove(oldRole);

      await message.member.roles.add(newRole);
    }

    memberConfig.rank.levelup = rsrc.getXPToLevelUp(memberConfig.rank.xp, memberConfig.rank.level);
    levelUp(client, message, memberConfig);
  }

  client.updateMember(memberConfig);

  //only write XP changes to the file every 10 messages
  if (memberConfig.rank.xp % DiscordConfig.preferences.xp_threshold === 0) {
    let jsonFile = path.join(rsrc.getMemberDirectoryFromGuild(message.guild, username), username + ".json");
    let newJson = JSON.stringify(memberConfig, null, "\t");
    fs.writeFileSync(jsonFile, newJson);
  }
}

/**
 * Level's up a member
 *
 * @param client the Discord client
 * @param message the Discord message
 * @param config the member's config
 */
function levelUp(client: Client, message: Message, config: MemberConfig) {
  let stats = client.getCommand("stats");
  let embed = stats.getEmbed(client, message.member, config);

  message.channel.send(`Congratulations ${message.author}!  You just leveled up!  Keep chatting to earn more XP and unlock roles and special perks!`);
  message.channel.send(embed);
}
