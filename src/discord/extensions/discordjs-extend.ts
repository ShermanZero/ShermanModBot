import * as Discord from "discord.js";

import rsrc from "../discord-resources";
import { Guild } from "discord.js";
import { MemberConfigType } from "../@interfaces/@member_config";
import { GuildConfigType } from "../@interfaces/@guild_config";
import DiscordConfig from "../configs/discord_config";

import { CommandType } from "../@interfaces/@commands";

Discord.Client.prototype.defaultGuild = null;
Discord.Client.prototype.discordConfig = new DiscordConfig();
Discord.Client.prototype.members_in_session = new Map<string, any>();
Discord.Client.prototype.guild_configs = new Map<string, GuildConfigType>();
Discord.Client.prototype.commands = new Map<string, CommandType>();
Discord.Client.prototype.aliases = new Map<string, string>();
Discord.Client.prototype.masterLog = new Array<string>();
Discord.Client.prototype.ready = false;
Discord.Client.prototype.alreadyShutdown = false;

Discord.Client.prototype.getGuild = function(guildName: string): any {
  return Discord.Client.prototype.members_in_session.get(guildName);
};

Discord.Client.prototype.getGuildConfig = function(guild: Guild): any {
  return Discord.Client.prototype.guild_configs.get(rsrc.getGuildNameFromGuild(guild));
};

Discord.Client.prototype.updateMember = function(config: MemberConfigType): boolean {
  if (!config) {
    `Attempted to update with ${config}, but failed`.error();
    return false;
  }

  let guildName = config.hidden?.guildname;
  let username = config.hidden?.username;

  if (!guildName || !username) {
    `Attempted to update with ${config}, but failed`.error();
    return false;
  }

  let guild = Discord.Client.prototype.members_in_session.get(guildName);

  guild.set(username, config);
  config = Discord.Client.prototype.hideMemberInfo(config);

  return config !== null;
};

Discord.Client.prototype.registerMember = function(config: MemberConfigType): boolean {
  if (!config) return false;

  let success = Discord.Client.prototype.updateMember(config);
  if (success) ("*Registered [" + config.hidden.username.magenta + "] to guild [" + config.hidden.guildname.magenta + "]").print();
  else {
    `Was not able to register ${config} to the guild`.error();
    return false;
  }

  return true;
};

Discord.Client.prototype.hideMemberInfo = function(config: MemberConfigType): any {
  Object.defineProperty(config, "hidden", {
    enumerable: false
  });

  return config;
};

Discord.Client.prototype.hasMember = function(guild: Guild, username: string, search?: boolean): string {
  let memberGuild = Discord.Client.prototype.members_in_session.get(rsrc.getGuildNameFromGuild(guild));
  if (memberGuild === null || typeof memberGuild === "undefined") return null;

  if (search) {
    let guildMembers = Array.from(guild.members.values());
    for (var i = 0; i < guildMembers.length; i++) {
      let member = guildMembers[i];

      let searchTargetDisplayname = member.displayName.toLowerCase().trim();
      let searchTargetUsername = member.user.username.toLowerCase().trim();

      username = username.toLowerCase().trim();
      if (searchTargetDisplayname.includes(username) || searchTargetUsername.includes(username)) return rsrc.getUsernameFromMember(member);
    }
  }

  let member = memberGuild[username];
  if (!member) return null;
  return String(member);
};

Discord.Client.prototype.getMemberConfig = function(guild: Guild, username: string): any {
  let guildName = rsrc.getGuildNameFromGuild(guild);
  let memberGuild = Discord.Client.prototype.members_in_session.get(guildName);

  if (memberGuild === null) {
    ("Could not retrieve [" + username + "'s] guild").error();
    return null;
  }

  if (memberGuild[username] === null || typeof memberGuild[username] === "undefined") {
    ("!! Could not locate [" + username + "] in [" + guildName + "]").error();
    return null;
  }

  return memberGuild[username];
};

Discord.Client.prototype.removeMember = function(guild: Guild, username: string): boolean {
  let memberGuild = Discord.Client.prototype.members_in_session.get(rsrc.getGuildNameFromGuild(guild));
  if (memberGuild === null || typeof memberGuild === "undefined") return false;

  memberGuild.remove(username);

  return true;
};

Discord.Client.prototype.deleteMember = function(guild: Guild, username: string): boolean {
  let passRemove: boolean = Discord.Client.prototype.removeMember(guild, username);
  let passDestroy: boolean = rsrc.destroyMemberDirectory(guild, username);

  return passRemove && passDestroy;
};

Discord.Client.prototype.addCommand = function(commandName: string, command: CommandType): boolean {
  Discord.Client.prototype.commands.set(commandName, command);

  command["properties"].aliases?.forEach((alias: string) => {
    Discord.Client.prototype.addAlias(commandName, alias);
  });

  return true;
};

Discord.Client.prototype.addAlias = function(commandName: string, commandAlias: string): boolean {
  Discord.Client.prototype.aliases.set(commandAlias, commandName);
  return true;
};

Discord.Client.prototype.getCommand = function(commandName: string): CommandType {
  `Attempting to retrieve command [${commandName.cyan}]`.print();
  let command = Discord.Client.prototype.commands.get(commandName);

  if (!command) {
    `  Command not immediately found, trying aliases`.warning();
    let alias: string = Discord.Client.prototype.aliases.get(commandName);
    if (alias) command = Discord.Client.prototype.commands.get(alias);
    else `  Command not found`.warning();
  }

  if (command) `Successfully located command: ${command}`.success();

  return command;
};

Discord.Client.prototype.getCommandRun = function(commandName: string): CommandType["run"] {
  let command = Discord.Client.prototype.getCommand(commandName);

  if (command) return command["run"];
  return null;
};

Discord.Client.prototype.getCommandCustom = function(commandName: string, customFunction: string): CommandType["custom"]["nameOfFunction"] {
  let command = Discord.Client.prototype.getCommand(commandName);

  if (command) return command["custom"][customFunction];
  return null;
};

Discord.Client.prototype.getCommandProperties = function(commandName: string): CommandType["properties"] {
  let command = Discord.Client.prototype.getCommand(commandName);

  if (command) return command["properties"];
  return null;
};
