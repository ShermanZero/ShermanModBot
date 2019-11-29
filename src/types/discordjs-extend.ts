import * as Discord from "discord.js";

import global_config from "../resources/global_config";
import rsrc from "../resources/resources";
import secrets from "../secrets";
import { Guild } from "discord.js";

Discord.Client.prototype.defaultGuild = null;
Discord.Client.prototype.secrets = secrets;
Discord.Client.prototype.global_config = global_config;
Discord.Client.prototype.usersInSession = new Map();
Discord.Client.prototype.guild_configs = new Map();
Discord.Client.prototype.commands = new Map();
Discord.Client.prototype.aliases = new Map();
Discord.Client.prototype.masterLog = [];
Discord.Client.prototype.ready = false;
Discord.Client.prototype.alreadyShutdown = false;

/**
 * Returns the gulid from the guild's name
 *
 * @param guildName the guild's name
 */
Discord.Client.prototype.getGuild = function(guildName: string): string {
  return Discord.Client.prototype.usersInSession[guildName];
};

/**
 * Updates the stored member data
 *
 * @param content the member's content
 */
Discord.Client.prototype.updateMember = function(content: any): boolean {
  if (!content) {
    `Attempted to update with ${content}, but failed`.error();
    return false;
  }

  let guildName = content.hidden?.guildname;
  let username = content.hidden?.username;

  if (!guildName || !username) {
    `Attempted to update with ${content}, but failed`.error();
    return false;
  }

  let guild = Discord.Client.prototype.usersInSession[guildName];

  guild[username] = content;
  content = Discord.Client.prototype.hideMemberInfo(content);

  return content !== null;
};

/**
 * Registers the member and stores them in the `Client`
 *
 * @param content the member's content
 */
Discord.Client.prototype.registerMember = function(content: any): boolean {
  if (!content) return;

  let success = Discord.Client.prototype.updateMember(content);
  if (success) ("*Registered [" + content.hidden.username.magenta + "] to guild [" + content.hidden.guildname.magenta + "]").print();
  else {
    `Was not able to register ${content} to the guild`.error();
    return false;
  }

  return true;
};

/**
 * Hides a member's info (tag)
 *
 * @param content the member's content
 */
Discord.Client.prototype.hideMemberInfo = function(content: any): any {
  Object.defineProperty(content, "hidden", {
    enumerable: false
  });

  return content;
};

/**
 * Returns if the client has a member stored in the cache
 *
 * @param guild the Discord `Guild`
 * @param username the member's username
 * @param search (optional) whether or not to recursively search given an incomplete username
 */
Discord.Client.prototype.hasMember = function(guild: Guild, username: string, search?: boolean): string {
  let userGuild = Discord.Client.prototype.usersInSession[rsrc.getGuildNameFromGuild(guild)];
  if (userGuild === null || typeof userGuild === "undefined") return null;

  if (search) {
    let guildMembers = Array.from(guild.members.values());
    for (var i = 0; i < guildMembers.length; i++) {
      let member = guildMembers[i];

      let searchTargetDisplayName = member.displayName.toLowerCase().trim();
      let searchTargetUserName = member.user.username.toLowerCase().trim();

      username = username.toLowerCase().trim();
      if (searchTargetDisplayName.includes(username) || searchTargetUserName.includes(username)) return rsrc.getUsernameFromMember(member);
    }
  }

  let user = userGuild[username];
  if (!user) return null;
  return String(user);
};

/**
 * Gets a stored member's content
 *
 * @param guild the Discord `Guild`
 * @param username the member's username
 */
Discord.Client.prototype.getMemberContent = function(guild: Guild, username: string): any {
  let guildName = rsrc.getGuildNameFromGuild(guild);
  let userGuild = Discord.Client.prototype.usersInSession[guildName];

  if (userGuild === null) {
    ("Could not retrieve [" + username + "'s] guild").error();
    return null;
  }

  if (userGuild[username] === null || typeof userGuild[username] === "undefined") {
    ("!! Could not locate [" + username + "] in [" + guildName + "]").error();
    return null;
  }

  return userGuild[username];
};

/**
 * Removes the member from the stored cache
 *
 * @param guild the Discord `Guild`
 * @param username the member's username
 */
Discord.Client.prototype.removeMember = function(guild: Guild, username: string): boolean {
  let userGuild = Discord.Client.prototype.usersInSession[rsrc.getGuildNameFromGuild(guild)];
  if (userGuild === null || typeof userGuild === "undefined") return;

  userGuild.remove(username);

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
