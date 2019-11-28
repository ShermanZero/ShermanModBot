import * as Discord from 'discord.js';

import rsrc from '../classes/Resources';
import global_config from '../resources/global_config';
import secrets from '../secrets';

Discord.Client.prototype.global_config = global_config;
Discord.Client.prototype.secrets = secrets;
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
    console.error(`!! Attempted to update with ${content}, but failed`.red);
    return false;
  }

  let guildName = content.hidden?.guildname;
  let username = content.hidden?.username;

  if (!guildName || !username) {
    console.error(`!! Attempted to update with ${content}, but failed`.red);
    return false;
  }

  let guild = Discord.Client.prototype.usersInSession[guildName];

  guild[username] = content;
  content = Discord.Client.prototype.hideUserInfo(content);

  return (content !== null);
};

Discord.Client.prototype.registerUser = function(content: any): boolean {
  if(!content) return;

  let success = Discord.Client.prototype.updateUser(content);
  if (success) console.log("*Registered [" + content.hidden.username.magenta + "] to guild [" + content.hidden.guildname.magenta + "]");
  else {
    console.error(`!! Was not able to register ${content} to the guild`.red);
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

Discord.Client.prototype.hasUser = function(guild: Discord.Guild, username: string): boolean {
  let userGuild = Discord.Client.prototype.usersInSession[rsrc.getGuildNameFromGuild(guild)];
  if (userGuild === null || typeof userGuild === "undefined") return false;

  let user = userGuild[username];
  return !(user === null || typeof user === "undefined");
};

Discord.Client.prototype.getUserContent = function(guild: Discord.Guild, username: string): any {
  let guildName = rsrc.getGuildNameFromGuild(guild);
  let userGuild = Discord.Client.prototype.usersInSession[guildName];

  if (userGuild === null) {
    console.error(("!! Could not retrieve [" + username + "'s] guild").red);
    return null;
  }

  if (userGuild[username] === null || typeof userGuild[username] === "undefined") {
    console.error(("!! Could not locate [" + username + "] in [" + guildName + "]").red);
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