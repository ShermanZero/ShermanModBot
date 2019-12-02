import { Client, Message, Role, TextChannel, MessageEmbed } from "discord.js";
import * as fs from "fs";
import * as path from "path";

import blacklist from "../../shared/resources/blacklist";
import rsrc from "../resources";
import { MemberConfigType } from "../@interfaces/@member_config";
import { GuildConfigType, guildConfigFileName, GuildElevationTypes } from "../@interfaces/@guild_config";
import { DiscordSecrets } from "../secrets/discord-secrets";
import { Ranks } from "../@interfaces/@ranks";

module.exports = async (client: Client, message: Message): Promise<boolean> => {
  //ignore all bots, the server itself (for welcome messages), and wait until this program is fully ready
  if (message.author.bot || message.author.id === "471444438216867840" || !client.ready) return false;

  //if the guild hasn't been set-up
  let guildConfig = client.getGuildConfig(message.guild);
  if (client.guildBeingSetup(message.guild)) return false;

  if ((!guildConfig || !guildConfig.setup) && !message.content.trim().startsWith("!config")) {
    if (message.member.hasPermission("ADMINISTRATOR")) {
      const answer = (await rsrc.askQuestion(message.member, message.channel as TextChannel, "the configuration for the guild needs to be setup, luckily you can do that!  Do you want me to automatically run the config?", {
        yesOrNo: true,
        replyTo: message
      })) as boolean;

      if (answer) {
        const config = client.getCommand("config");
        config.run(client, message);
      } else {
        message.channel.send("Okay, when you're ready to run the configuration, type !config");
        return false;
      }
    } else {
      await message.reply("a member with administrator privileges has to configure me before I can execute commands :( go bug them!");
      return false;
    }
  }

  //register the member
  if (!(await registerMessage(client, message))) {
    `Could not register message sent by [${rsrc.getUsernameFromMessage(message)}]`.error();
    return false;
  }

  //check against blacklist
  if (blacklist.words.some(substring => message.content.includes(substring))) {
    await message.delete();
    await message.reply("that is not allowed here, you have been warned.");

    let username = rsrc.getUsernameFromMessage(message);
    let memberConfig = await rsrc.getMemberConfigFromName(client, message, username);

    if (memberConfig) {
      memberConfig.misc.warnings++;
      client.updateMember(memberConfig);
    }
  }

  awardExperience(client, message);

  //ignore messages not starting with the prefix
  if (message.content.indexOf(client.discordConfig.prefix) !== 0) return false;

  //standard argument/command name definition
  let args: string[] = message.content
    .slice(client.discordConfig.prefix.length)
    .trim()
    .split(/ +/g);

  let command: string;
  if (args) command = args.shift().toLowerCase();
  if (!command) return false;

  //grab the command data from the client.commands map
  const commandFunction = client.getCommandRun(command);
  const commandProperties = client.getCommandProperties(command);

  //if the command doesn't exist
  if (!commandFunction || !commandProperties) return false;

  if (!guildConfig) {
    let guildDir = rsrc.getGuildDirectoryFromGuild(message.guild);
    let guildConfigFile = path.resolve(guildDir, guildConfigFileName);

    if (fs.existsSync(guildConfigFile)) {
      guildConfig = (await import(guildConfigFile)) as GuildConfigType;
      client.setGuildConfig(rsrc.getGuildNameFromGuild(message.guild), guildConfig);
    }
  }

  if (command !== "config" && commandProperties.elevation && message.member.user.id !== DiscordSecrets.botowner) {
    if (commandProperties.elevation !== GuildElevationTypes.everyone && !message.member?.roles.get(guildConfig.role_names[commandProperties.elevation])) return false;
  }

  if (args) commandFunction(client, message, args);
  else commandFunction(client, message);

  return true;
};

/**
 * Registers a message that has been posted in a guild
 *
 * @param client the Discord client
 * @param message the Discord message
 */
async function registerMessage(client: Client, message: Message): Promise<boolean> {
  let username = rsrc.getUsernameFromMessage(message);

  if (!message.guild) return false;

  let guildName = rsrc.getGuildNameFromGuild(message.guild);
  let memberDir = rsrc.getMemberDirectoryFromGuild(message.guild, username);

  let memberConfig: MemberConfigType;

  //if the member has not been registered
  if (!fs.existsSync(memberDir)) rsrc.createMemberDirectory(client, message.guild, message.member!);

  //member NOT stored in local client session
  if (!client.hasMember(message.guild, username)) {
    memberConfig = await rsrc.getMemberConfigFromName(client, message, username);
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
  masterLogMessage.masterLog(client, message.guild, client.discordConfig.logs.message, true);

  memberConfig.memberLog.push(memberLogMessage.stripColors + "\n");
  memberLogMessage.memberLog(client, message.guild, memberConfig, client.discordConfig.logs.message);

  client.updateMember(memberConfig);
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
  //get the config from the session instead of from the file
  let memberConfig = client.getMemberConfig(message.guild, username);

  if (!memberConfig) {
    `Could not retrieve config from [${username}]`.error();
    return;
  }

  memberConfig.rank.xp += 1;

  if (memberConfig.rank.xp >= memberConfig.rank.levelup) {
    memberConfig.rank.level += 1;

    let newLevelUp = memberConfig.rank.level + 5;
    memberConfig.rank.levelup = newLevelUp;

    let rank = Ranks.levels[memberConfig.rank.level];
    if (rank) {
      let lastRank = memberConfig.rank.name;

      memberConfig.rank.name = rank;
      let oldRole = message.guild.roles.find((role: Role) => role.name.toLowerCase() === lastRank.toLowerCase());
      let newRole = message.guild.roles.find((role: Role) => role.name.toLowerCase() === rank.toLowerCase());

      if (oldRole) await message.member.roles.remove(oldRole);

      await message.member.roles.add(newRole);
    }

    const xpToLevelUp = rsrc.getXPToLevelUp(memberConfig.rank.xp, memberConfig.rank.level);
    if (xpToLevelUp !== -1) {
      memberConfig.rank.levelup = xpToLevelUp;
      levelUp(client, message, memberConfig);
    }
  }

  client.updateMember(memberConfig);

  //only write XP changes to the file every 10 messages
  if (memberConfig.rank.xp % client.discordConfig.preferences.xp_threshold === 0) {
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
 * @param memberConfig the member's config
 */
function levelUp(client: Client, message: Message, memberConfig: MemberConfigType) {
  let embedCommand = client.getCommandCustom("stats", "embed");
  let embed = embedCommand(client, message.guild, memberConfig) as MessageEmbed;

  message.channel.send(`Congratulations ${message.author}!  You just leveled up!  Keep chatting to earn more XP and unlock roles and special perks!`);
  message.channel.send(embed);
}
