import * as Discord from 'discord.js';

import global_config from '../resources/global_config';
import rsrc from '../resources/resources';
import secrets from '../secrets';

Discord.Client.prototype.defaultGuild = null;
Discord.Client.prototype.secrets = secrets;
Discord.Client.prototype.global_config = global_config;
Discord.Client.prototype.usersInSession = new Map();
Discord.Client.prototype.guild_configs = new Map();
Discord.Client.prototype.commands = new Map();
Discord.Client.prototype.aliases = new Map();
Discord.Client.prototype.masterLog = [];

Discord.Client.prototype.getGuild = function(guildName: string): string {
  return Discord.Client.prototype.usersInSession[guildName];
};

Discord.Client.prototype.updateUser = function(content: any): boolean {
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
  content = Discord.Client.prototype.hideUserInfo(content);

  return content !== null;
};

Discord.Client.prototype.registerUser = function(content: any): boolean {
  if (!content) return;

  let success = Discord.Client.prototype.updateUser(content);
  if (success) ("*Registered [" + content.hidden.username.magenta + "] to guild [" + content.hidden.guildname.magenta + "]").normal();
  else {
    `Was not able to register ${content} to the guild`.error();
    return false;
  }

  return true;
};

Discord.Client.prototype.hideUserInfo = function(content: any): any {
  Object.defineProperty(content, "hidden", {
    enumerable: false
  });

  return content;
};

Discord.Client.prototype.hasUser = function(guild: Discord.Guild, username: string, search?: boolean): string {
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

Discord.Client.prototype.getUserContent = function(guild: Discord.Guild, username: string): any {
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

Discord.Client.prototype.removeUser = function(guild: Discord.Guild, username: string): boolean {
  let userGuild = Discord.Client.prototype.usersInSession[rsrc.getGuildNameFromGuild(guild)];
  if (userGuild === null || typeof userGuild === "undefined") return;

  userGuild["delete"](username);

  return true;
};

Discord.Client.prototype.deleteUser = function(guild: Discord.Guild, username: string): boolean {
  let passRemove: boolean = Discord.Client.prototype.removeUser(guild, username);
  let passDestroy: boolean = rsrc.destroyUserDirectory(guild, username);

  return passRemove && passDestroy;
};

Discord.Client.prototype.getCommand = function(commandName: string): any {
  let command = Discord.Client.prototype.commands.get(commandName);

  if (!command) command = Discord.Client.prototype.commands.get(Discord.Client.prototype.aliases.get(commandName));

  return command;
};
