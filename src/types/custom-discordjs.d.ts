import * as Discord from 'discord.js';

declare module "discord.js" {
  interface Client {
    global_config: Object;
    usersInSession: Map<string, any>;
    guild_configs: Map<string, any>;
    commands: Map<string, any>;
    aliases: Map<string, string>;
    masterLog: Array;

    getGuild(): Guild;
    updateUser(): boolean;
    registerUser(): boolean;
    hideUserInfo(): any;
    hasUser(): boolean;
    getUserContent(): any;
    removeUser(): boolean;
    deleteUser(): boolean;
    getCommand(): any;
  }
}

Discord.Client.prototype.global_config = require("./resources/global_config");
Discord.Client.prototype.usersInSession = new Map();
Discord.Client.prototype.guild_configs = new Map();
Discord.Client.prototype.commands = new Map();
Discord.Client.prototype.aliases = new Map();
Discord.Client.prototype.masterLog = [];

Discord.Client.prototype.getGuild = function(guildName: string) {
  return client.usersInSession[guildName];
};

Discord.Client.prototype.updateUser = function(content: any) {
  let guildName = content.hidden.guildname;
  let username = content.hidden.username;
  let guild = client.usersInSession[guildName];
  guild[username] = content;
  content = client.hideUserInfo(content);
};

Discord.Client.prototype.registerUser = function(content: any) {
  client.updateUser(content);
  console.log("*Registered [" + content.hidden.username.magenta + "] to guild [" + content.hidden.guildname.magenta + "]");
};

Discord.Client.prototype.hideUserInfo = function(content: any) {
  Object.defineProperty(content, "hidden", {
    enumerable: false
  });

  return content;
};

Discord.Client.prototype.hasUser = function(guild: Discord.Guild, username: string) {
  let userGuild = client.usersInSession[rsrc.getGuildNameFromGuild(guild)];
  if (userGuild === null || typeof userGuild === "undefined") return false;

  let user = userGuild[username];
  return !(user === null || typeof user === "undefined");
};

Discord.Client.prototype.getUserContent = function(guild: Discord.Guild, username: string) {
  let guildName = rsrc.getGuildNameFromGuild(guild);
  let userGuild = client.usersInSession[guildName];

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

Discord.Client.prototype.removeUser = function(guild: Discord.Guild, username: string) {
  let userGuild = client.usersInSession[rsrc.getGuildNameFromGuild(guild)];
  if (userGuild === null || typeof userGuild === "undefined") return;

  userGuild["delete"](username);
};

Discord.Client.prototype.deleteUser = function(guild: Discord.Guild, username: string) {
  client.removeUser(guild, username);
  rsrc.destroyUserDirectory(guild, username);
};

Discord.Client.prototype.getCommand = function(commandName: string) {
  let command = client.commands.get(commandName);

  if (!command) command = client.commands.get(client.aliases.get(commandName));

  return command;
};

export {};
