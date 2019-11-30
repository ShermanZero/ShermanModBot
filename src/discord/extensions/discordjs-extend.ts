import * as Discord from "discord.js";

import rsrc from "../discord-resources";
import { Guild } from "discord.js";
import { MemberConfigType } from "../@interfaces/@member_config";
import { GuildConfigType, guildConfigFileName } from "../@interfaces/@guild_config";
import DiscordConfig from "../configs/discord_config";

import { CommandType } from "../@interfaces/@commands";
import { DiscordSecrets } from "../secrets/discord-secrets";
import { ArgumentsNotFulfilled } from "../../shared/extensions/error/error-extend";
import GuildConfig from "../configs/guild_config";
import * as fs from "fs";
import * as path from "path";

Discord.Client.prototype.masterGuild = DiscordSecrets.guild_id;
Discord.Client.prototype.discordConfig = new DiscordConfig();
Discord.Client.prototype.masterLog = new Array<string>();

Discord.Client.prototype.registerGuild = function(guildName: string, guildConfig: GuildConfigType): GuildConfigType {
  if (!this.guildsInSession) this.guildsInSession = new Map<string, GuildConfigType>();
  if (!guildConfig) guildConfig = new GuildConfig();

  this.guildsInSession.set(guildName, guildConfig);
  `*Registered [${guildName.magenta}] to session`.print();

  return guildConfig;
};

Discord.Client.prototype.getGuildMembers = function(guildName: string): Map<string, MemberConfigType> {
  if (!this.membersInSession) this.membersInSession = new Map<string, Map<string, MemberConfigType>>();

  let membersOfGuild = this.membersInSession.get(guildName);
  if (!membersOfGuild) {
    membersOfGuild = new Map<string, MemberConfigType>();
    this.membersInSession.set(guildName, membersOfGuild);
  }

  return membersOfGuild;
};

Discord.Client.prototype.getGuildConfig = function(guild: Guild): GuildConfigType {
  if (!this.guildsInSession) this.guildsInSession = new Map<string, GuildConfigType>();

  let guildName = rsrc.getGuildNameFromGuild(guild);
  let guildConfig = this.guildsInSession.get(guildName);
  if (!guildConfig) guildConfig = this.registerGuild(guildName, null);

  return guildConfig;
};

Discord.Client.prototype.setGuildConfig = function(guildName: string, guildConfig: GuildConfigType): boolean {
  if (!this.guildsInSession) this.guildsInSession = new Map<string, GuildConfigType>();

  this.guildsInSession.set(guildName, guildConfig);

  let configFile = path.join(rsrc.getGuildDirectoryFromName(guildName), guildConfigFileName);
  fs.writeFileSync(configFile, JSON.stringify(guildConfig, null, "\t"));

  return true;
};

Discord.Client.prototype.updateMember = function(memberConfig: MemberConfigType): MemberConfigType {
  if (!memberConfig) {
    `Attempted to update member's config: ${memberConfig}, but failed`.error();
    return null;
  }

  let guildname = memberConfig.hidden?.guildname;
  let username = memberConfig.hidden?.username;

  if (!guildname || !username) {
    new ArgumentsNotFulfilled(guildname, username);
    `Attempted to update member's config: ${memberConfig}, but failed`.error();
    return memberConfig;
  }

  let guildMembers = this.getGuildMembers(guildname);
  guildMembers.set(username, memberConfig);
  memberConfig = this.hideMemberInfo(memberConfig);

  return memberConfig;
};

Discord.Client.prototype.registerMember = function(memberConfig: MemberConfigType): MemberConfigType {
  if (!memberConfig) return null;

  let success = this.updateMember(memberConfig);
  if (success) ("*Registered [" + memberConfig.hidden.username.magenta + "] to guild [" + memberConfig.hidden.guildname.magenta + "]").print();
  else {
    `Was not able to register ${memberConfig} to the guild`.error();
    return null;
  }

  return memberConfig;
};

Discord.Client.prototype.hideMemberInfo = function(memberConfig: MemberConfigType): MemberConfigType {
  Object.defineProperty(memberConfig, "hidden", {
    enumerable: false
  });

  return memberConfig;
};

Discord.Client.prototype.hasMember = function(guild: Guild, username: string, search?: boolean): string {
  let guildname = rsrc.getGuildNameFromGuild(guild);
  let membersInGuild = this.getGuildMembers(guildname);
  if (!membersInGuild) return null;

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
  let membersInGuild = this.getGuildMembers(guildname);

  if (!membersInGuild) {
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
  let membersInGuild = this.getGuildMembers(guildname);
  if (!membersInGuild) return false;

  membersInGuild.delete(username);
  return true;
};

Discord.Client.prototype.deleteMember = function(guild: Guild, username: string): boolean {
  let passRemove: boolean = this.removeMember(guild, username);
  let passDestroy: boolean = rsrc.destroyMemberDirectory(guild, username);

  return passRemove && passDestroy;
};

Discord.Client.prototype.addCommand = function(commandName: string, command: CommandType): boolean {
  if (!this.commands) this.commands = new Map<string, CommandType>();
  this.commands.set(commandName, command);

  command["properties"].aliases?.forEach((alias: string) => {
    this.addAlias(commandName, alias);
  });

  return true;
};

Discord.Client.prototype.addAlias = function(commandName: string, commandAlias: string): boolean {
  if (!this.aliases) this.aliases = new Map<string, string>();
  this.aliases.set(commandAlias, commandName);

  return true;
};

Discord.Client.prototype.getCommand = function(commandName: string): CommandType {
  if (!this.commands) this.commands = new Map<string, CommandType>();
  let command = this.commands.get(commandName);

  if (!command) {
    let alias: string = this.aliases.get(commandName);
    if (alias) command = this.commands.get(alias);
    else `  Command ${commandName} not found`.warning(true);
  }

  return command;
};

Discord.Client.prototype.getCommandRun = function(commandName: string): CommandType["run"] {
  let command = this.getCommand(commandName);

  if (command) return command["run"];
  return null;
};

Discord.Client.prototype.getCommandCustom = function(commandName: string, customFunction: string): CommandType["custom"]["nameOfFunction"] {
  let command = this.getCommand(commandName);

  if (command) return command["custom"][customFunction];
  return null;
};

Discord.Client.prototype.getCommandProperties = function(commandName: string): CommandType["properties"] {
  let command = this.getCommand(commandName);

  if (command) return command["properties"];
  return null;
};
