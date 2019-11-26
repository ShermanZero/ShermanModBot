import 'colors';

import * as Discord from 'discord.js';
import * as fs from 'fs';
import * as path from 'path';

import rsrc from './classes/Resources';
import * as config from './resources/config.json';

let client: any = new Discord.Client();

init();
start();

client.login(config.token);

function init() {
  client.config = config;
  client.usersInSession = new Map();
  client.masterLog = [];

  client.getGuild = function(guildName: string) {
    return client.usersInSession[guildName];
  };

  client.updateUser = function(content: any) {
    var guildName = content.hidden.guildname;
    var username = content.hidden.username;
    var guild = client.usersInSession[guildName];
    guild[username] = content;
    Object.defineProperty(content, "hidden", {
      enumerable: false
    });
  };

  client.registerUser = function(content: any) {
    client.updateUser(content);
    console.log(
      "*Registered [" +
        content.hidden.username.magenta +
        "] to guild [" +
        content.hidden.guildname.magenta +
        "]"
    );
  };

  client.hasUser = function(guild: Discord.Guild, username: string) {
    var userGuild = client.usersInSession[rsrc.getGuildNameFromGuild(guild)];
    if (userGuild === null || typeof userGuild === "undefined") return false;

    var user = userGuild[username];
    return !(user === null || typeof user === "undefined");
  };

  client.getUserContent = function(guild: Discord.Guild, username: string) {
    var guildName = rsrc.getGuildNameFromGuild(guild);
    var userGuild = client.usersInSession[guildName];

    if (userGuild === null) {
      console.error(("!! Could not retrieve [" + username + "'s] guild").red);
      return null;
    }

    if (
      userGuild[username] === null ||
      typeof userGuild[username] === "undefined"
    ) {
      console.error(
        ("!! Could not locate [" + username + "] in [" + guildName + "]").red
      );
      return null;
    }

    return userGuild[username];
  };

  client.removeUser = function(guild: Discord.Guild, username: string) {
    var userGuild = client.usersInSession[rsrc.getGuildNameFromGuild(guild)];
    if (userGuild === null || typeof userGuild === "undefined") return;

    userGuild["delete"](username);
  };

  client.deleteUser = function(guild: Discord.Guild, username: string) {
    client.removeUser(guild, username);
    rsrc.destroyUserDirectory(guild, username);
  };
}

function start() {
  var eventsPath = path.join(__dirname, "events");
  fs.readdir(eventsPath, function(err, files) {
    if (err) return console.error(err);
    files.forEach(function(file) {
      if (!file.endsWith(".js")) return;
      var event = require(path.join(__dirname, "events", file));
      var eventName = file.split(".")[0];
      client.on(eventName, event.bind(null, client));
      delete require
        .cache[require.resolve(path.join(__dirname, "events", file))];
    });
  });

  client.commands = new Map();
  var commandsPath = path.join(__dirname, "commands");

  fs.readdir(commandsPath, function(err, files) {
    if (err) return console.error(err);
    files.forEach(function(file) {
      if (!file.endsWith(".js")) return;
      var props = require(path.join(__dirname, "commands", file));
      var commandName = file.split(".")[0];
      client.commands.set(commandName, props);
    });
  });
}
