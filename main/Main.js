require("colors");

const Discord = require('discord.js');
const path = require("path");
const client = new Discord.Client();
const config = require(path.join(__dirname, "resources", "config.json"));
const fs = require("fs");
const Resources = require(path.join(__dirname, "classes", "Resources.js"));
const Enmap = require("enmap");

init();
start();

client.login(config.token);

function init() {
  client.config = config;

  client.usersInSession = new Map();
  client.masterLog = [];

  client.getGuild = (guildName) => {
    return client.usersInSession[guildName];
  };

  client.updateUser = (content) => {
    let guildName = content.hidden.guildname;
    let username = content.hidden.username;

    let guild = client.usersInSession[guildName];
    guild[username] = content;

    Object.defineProperty(content, "hidden", {
      enumerable: false
    });
  };

  client.registerUser = (content) => {
    client.updateUser(content);
    console.log(`*Registered [${content.hidden.username.magenta}] to guild [${content.hidden.guildname.magenta}]`);
  };
 
  client.hasUser = (guild, username) => {
    let userGuild = client.usersInSession[Resources.getGuildNameFromGuild(guild)];
    if(userGuild === null || typeof userGuild === "undefined") return false;

    let user = userGuild[username];
    return !(user === null || typeof user === "undefined");
  };

  client.getUserContent = (guild, username) => {
    let guildName = Resources.getGuildNameFromGuild(guild);
    let userGuild = client.usersInSession[guildName];

    if(userGuild === null) {
      console.error(`!! Could not retrieve [${username}'s] guild`.red);
      return null;
    }

    if(userGuild[username] === null || typeof userGuild[username] === "undefined") {
      console.error(`!! Could not locate [${username}] in [${guildName}]`.red);
      return null;
    }

    return userGuild[username];
  }

  client.removeUser = (guild, username) => {
    let userGuild = client.usersInSession[Resources.getGuildNameFromGuild(guild)];
    if (userGuild === null || typeof userGuild === "undefined") return;

    userGuild.delete(username);
  }

  client.deleteUser = (guild, username) => {
    client.removeUser(guild, username);
    Resources.destroyUserDirectory(guild, username);
  }
}

function start() {
  let eventsPath = path.join(__dirname, "events");
  fs.readdir(eventsPath, (err, files) => {
    if(err) return console.error(err);

    files.forEach(file => {
      if(!file.endsWith(".js")) return;

      const event = require(path.join(__dirname, "events", file));

      let eventName = file.split(".")[0];

      client.on(eventName, event.bind(null, client));
      delete require.cache[require.resolve(path.join(__dirname, "events", file))];
    })
  });

  client.commands = new Enmap();

  let commandsPath = path.join(__dirname, "commands");
  fs.readdir(commandsPath, (err, files) => {
    if(err) return console.error(err);

    files.forEach(file => {
      if(!file.endsWith(".js")) return;

      let props = require(path.join(__dirname, "commands", file));
      let commandName = file.split(".")[0];

      client.commands.set(commandName, props);
    })
  });
}
