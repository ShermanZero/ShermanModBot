import * as Discord from "discord.js";

import rsrc from "../discord-resources";
import { Guild } from "discord.js";
import { MemberConfigType } from "../@interfaces/@member_config";
import { GuildConfigType } from "../@interfaces/@guild_config";
import DiscordConfig from "../configs/discord_config";

import { CommandType } from "../@interfaces/@commands";
import { DiscordSecrets } from "../secrets/discord-secrets";

Discord.Client.prototype.masterGuild = DiscordSecrets.guild_id;
Discord.Client.prototype.discordConfig = new DiscordConfig();
Discord.Client.prototype.membersInSession = new Map<string, Map<string, MemberConfigType>>();
Discord.Client.prototype.guildsInSession = new Map<string, GuildConfigType>();
Discord.Client.prototype.commands = new Map<string, CommandType>();
Discord.Client.prototype.aliases = new Map<string, string>();
Discord.Client.prototype.masterLog = new Array<string>();
Discord.Client.prototype.ready = false;
Discord.Client.prototype.alreadyShutdown = false;

Discord.Client.prototype.registerGuild = function(guildname: string, guildConfig: GuildConfigType): boolean {
  Discord.Client.prototype.guildsInSession.set(guildname, guildConfig);
  return true;
};

Discord.Client.prototype.getGuildMembers = function(guildName: string): Map<string, MemberConfigType> {
  return Discord.Client.prototype.membersInSession.get(guildName);
};

Discord.Client.prototype.getGuildConfig = function(guild: Guild): GuildConfigType {
  return Discord.Client.prototype.guildsInSession.get(rsrc.getGuildNameFromGuild(guild));
};

Discord.Client.prototype.updateMember = function(config: MemberConfigType): boolean {
  if (!config) {
    `Attempted to update with ${config}, but failed`.error();
    return false;
  }

  let guildname = config.hidden?.guildname;
  let username = config.hidden?.username;

  if (!guildname || !username) {
    `Attempted to update with ${config}, but failed`.error();
    return false;
  }

  let guildMembers = Discord.Client.prototype.getGuildMembers(guildname);
  guildMembers.set(username, config);
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

Discord.Client.prototype.hideMemberInfo = function(config: MemberConfigType): MemberConfigType {
  Object.defineProperty(config, "hidden", {
    enumerable: false
  });

  return config;
};

Discord.Client.prototype.hasMember = function(guild: Guild, username: string, search?: boolean): string {
  let guildname = rsrc.getGuildNameFromGuild(guild);
  let membersInGuild = Discord.Client.prototype.getGuildMembers(guildname);
  if (membersInGuild === null || typeof membersInGuild === "undefined") return null;

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

  let member = membersInGuild.get(username);
  return member ? String(member) : null;
};

Discord.Client.prototype.getMemberConfig = function(guild: Guild, username: string): MemberConfigType {
  let guildname = rsrc.getGuildNameFromGuild(guild);
  let membersInGuild = Discord.Client.prototype.membersInSession.get(guildname);

  if (membersInGuild === null) {
    ("Could not retrieve [" + username + "'s] guild").error();
    return null;
  }

  if (!membersInGuild.get(username)) {
    ("!! Could not locate [" + username + "] in [" + guildname + "]").error();
    return null;
  }

  return membersInGuild.get(username);
};

Discord.Client.prototype.removeMember = function(guild: Guild, username: string): boolean {
  let guildname = rsrc.getGuildNameFromGuild(guild);
  let membersInGuild = Discord.Client.prototype.membersInSession.get(guildname);
  if (!membersInGuild) return false;

  membersInGuild.delete(username);
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
  `Attempting to retrieve command [${commandName.cyan}]`.print(true);
  let command = Discord.Client.prototype.commands.get(commandName);

  if (!command) {
    `  Command not immediately found, trying aliases`.warning(true);
    let alias: string = Discord.Client.prototype.aliases.get(commandName);
    if (alias) command = Discord.Client.prototype.commands.get(alias);
    else `  Command not found`.warning(true);
  }

  if (command) `Successfully located command: ${command}`.success(true);

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
