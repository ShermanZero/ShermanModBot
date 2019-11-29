import * as Discord from "discord.js";

import rsrc from "../discord-resources";
import { Guild } from "discord.js";
import { MemberConfigType } from "../types/@member_config";
import { GuildConfigType } from "../types/@guild_config";
import DiscordConfig from "../configs/discord_config";

Discord.Client.prototype.defaultGuild = null;
Discord.Client.prototype.discordConfig = new DiscordConfig();
Discord.Client.prototype.members_in_session = new Map<string, MemberConfigType>();
Discord.Client.prototype.guild_configs = new Map<string, GuildConfigType>();
Discord.Client.prototype.commands = new Map<string, Function>();
Discord.Client.prototype.aliases = new Map<string, string>();
Discord.Client.prototype.masterLog = new Array<string>();
Discord.Client.prototype.ready = false;
Discord.Client.prototype.alreadyShutdown = false;

/**
 * Returns the gulid from the guild's name
 *
 * @param guildName the guild's name
 */
Discord.Client.prototype.getGuild = function(guildName: string): string {
  return Discord.Client.prototype.members_in_session.get(guildName);
};

/**
 * Returns the guild config from the guild
 *
 * @param guild the Discord `Guild`
 */
Discord.Client.prototype.getGuildConfig = function(guild: Guild): any {
  return Discord.Client.prototype.guild_configs.get(rsrc.getGuildNameFromGuild(guild));
};

/**
 * Updates the stored member data
 *
 * @param config the member's config
 */
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

  guild[username] = config;
  config = Discord.Client.prototype.hideMemberInfo(config);

  return config !== null;
};

/**
 * Registers the member and stores them in the `Client`
 *
 * @param config the member's config
 */
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

/**
 * Hides a member's info (tag)
 *
 * @param config the member's config
 */
Discord.Client.prototype.hideMemberInfo = function(config: MemberConfigType): any {
  Object.defineProperty(config, "hidden", {
    enumerable: false
  });

  return config;
};

/**
 * Returns if the client has a member stored in the cache
 *
 * @param guild the Discord `Guild`
 * @param username the member's username
 * @param search (optional) whether or not to recursively search given an incomplete username
 */
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

/**
 * Gets a stored member's config
 *
 * @param guild the Discord `Guild`
 * @param username the member's username
 */
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

/**
 * Removes the member from the stored cache
 *
 * @param guild the Discord `Guild`
 * @param username the member's username
 */
Discord.Client.prototype.removeMember = function(guild: Guild, username: string): boolean {
  let memberGuild = Discord.Client.prototype.members_in_session.get(rsrc.getGuildNameFromGuild(guild));
  if (memberGuild === null || typeof memberGuild === "undefined") return false;

  memberGuild.remove(username);

  return true;
};

/**
 * Deletes a member completely from the server
 *
 * @param guild the Discord `Guild`
 * @param username the member's username
 */
Discord.Client.prototype.deleteMember = function(guild: Guild, username: string): boolean {
  let passRemove: boolean = Discord.Client.prototype.removeMember(guild, username);
  let passDestroy: boolean = rsrc.destroyMemberDirectory(guild, username);

  return passRemove && passDestroy;
};

/**
 * Returns a command stored in the cache
 *
 * @param commandName the command's name
 */
Discord.Client.prototype.getCommand = function(commandName: string): any {
  let command = Discord.Client.prototype.commands.get(commandName);

  if (!command) command = Discord.Client.prototype.commands.get(Discord.Client.prototype.aliases.get(commandName));

  return command;
};
